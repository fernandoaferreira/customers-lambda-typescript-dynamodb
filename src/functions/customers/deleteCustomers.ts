import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import customerDb from "../../db/repository/dynamoDb/customers";
import schema from "./schemas/schemaClientId";
import jwtVerify from "../../libs/jwtVerify";

const deleteCustomers: ValidatedEventAPIGatewayProxyEvent<
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
    await customerDb.deleteCustomer(clientId);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Cliente ${clientId} deleted successfully`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error deleted", error: error.message }),
    };
  }
};

export const main = middyfy(deleteCustomers);
