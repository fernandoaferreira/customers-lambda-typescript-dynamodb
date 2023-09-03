import { middyfy } from "@libs/lambda";
import customerDb from "../../db/repository/dynamoDb/customers";
import jwtVerify from "../../libs/jwtVerify";

const updateCustomers = async (event) => {
  const token = event.headers?.Authorization;
  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Token JWT ausente" }),
    };
  }

  const tokenAcessValidate = await jwtVerify(token);

  if (!tokenAcessValidate) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "Token Invalid"
      }),
    };
  }
  
  const clientId: string = event.queryStringParameters.clientId;
  const requestBody = event.body;

  const customerValidated = await customerDb.getById(clientId);
  if (!customerValidated.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: `Customer ${clientId} does not exist`,
      }),
    };
  }

  try {
    await customerDb.updateCustomer(clientId, requestBody)
    const custumerUpdated = await customerDb.getById(clientId);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Client updated successfully",
        clienteUpdated: custumerUpdated,
      }),
    };
  } catch (error) {
    console.error("Error inserting client:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error updated client",
        error: error.message,
      }),
    };
  }
};

export const main = middyfy(updateCustomers);
