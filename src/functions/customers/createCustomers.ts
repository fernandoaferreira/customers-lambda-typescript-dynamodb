import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { v4 as uuidv4 } from "uuid";
import customerDb from '../../db/repository/dynamoDb/customers'
import schema from "./schemas/schemaCreate";
import jwtVerify from "../../libs/jwtVerify";

const createCustomers: ValidatedEventAPIGatewayProxyEvent<
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

  const newCustomer = {
    clientId: uuidv4(),
    name: event.body.name,
    email: event.body.email,
  };

  try {
    await customerDb.createNewCustomer(newCustomer);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Client inserted successfully",
        newClient: newCustomer,
      }),
    };
  } catch (error) {
    console.error("Error inserting client:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error inserting client",
        error: error.message,
      }),
    };
  }
};

export const main = middyfy(createCustomers);
