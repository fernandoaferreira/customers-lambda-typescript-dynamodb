import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schemas/schemaSearch";
import customerDb from "../../db/repository/dynamoDb/customers";
import jwtVerify from "../../libs/jwtVerify";

const getByIdCustomers: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
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

  try {
    const customer = await customerDb.getById(clientId);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Client By Id",
        newClient: customer,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error cliente By Id",
        error: error.message,
      }),
    };
  }
};

export const main = middyfy(getByIdCustomers);
