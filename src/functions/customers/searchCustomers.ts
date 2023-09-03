import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import customerDb from "../../db/repository/dynamoDb/customers";
import schemaText from "./schemas/schemaSearch";
import jwtVerify from "../../libs/jwtVerify";

const searchCustomers: ValidatedEventAPIGatewayProxyEvent<
  typeof schemaText
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
  
  const searchTextBody: string = event.queryStringParameters.searchText;

  try {
    const result = await customerDb.searchCustomer(searchTextBody);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Result Scan Searh",
        count: result.Count,
        searchList: result.Items,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error search querying",
        error: error.message,
      }),
    };
  }
};

export const main = middyfy(searchCustomers);
