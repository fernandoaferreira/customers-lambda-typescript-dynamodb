import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import customerDb from "../../db/repository/dynamoDb/customers";
import _cache from "../../db/repository/cache/customers/cache";
import schemaText from "./schemas/schemaSearch";
import jwtVerify from "../../libs/jwtVerify";

const getAllCustomers: ValidatedEventAPIGatewayProxyEvent<
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

  const cacheCustomerListAll = await _cache.getAllCustomerCache();

  if (cacheCustomerListAll) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Clients list successfully By Cache",
        clients: cacheCustomerListAll,
      }),
    };
  }

  try {
    const result = await customerDb.getAllCustomer();
    await _cache.setAllCustomerConnection(result);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Clients list successfully",
        clients: result.Items
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error get all querying",
        error: error.message,
      }),
    };
  }
};

export const main = middyfy(getAllCustomers);
