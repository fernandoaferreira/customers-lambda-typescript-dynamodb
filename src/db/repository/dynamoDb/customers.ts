import db from "../../dataBases/dynamoDbConnection";
import env from "../../../functions/customers/envs/envs"

const TABLE_NAME = env.TABLE_NAME;

const customersDb = {
  createNewCustomer: async (newCustomer: any) => {
    const params = {
      TableName: TABLE_NAME,
      Item: newCustomer,
    };

    return db.dynamoDB.put(params).promise();
  },
  deleteCustomer: async (clientId: any) => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        clientId: clientId,
      },
    };
    return db.dynamoDB.delete(params).promise();
  },
  getAllCustomer: async () => {
    const params = {
      TableName: TABLE_NAME,
    };

    return db.dynamoDB.scan(params).promise();
  },
  getById: async (clientId: string) => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        clientId: clientId,
      },
    };
    return db.dynamoDB.get(params).promise();
  },
  searchCustomer: async (searchTextBody: string) => {
    const params = {
      TableName: TABLE_NAME,
      FilterExpression:
        "contains(#attrName1, :searchText) OR contains(#attrName2, :searchText)",
      ExpressionAttributeNames: {
        "#attrName1": "name",
        "#attrName2": "email",
      },
      ExpressionAttributeValues: {
        ":searchText": searchTextBody,
      },
    };
    return await db.dynamoDB.scan(params).promise();
  },
  updateCustomer: async (clientId, requestBody) => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        clientId: clientId,
      },
      UpdateExpression: "SET #attrName1 = :name, #attrName2 = :email",
      ExpressionAttributeNames: {
        "#attrName1": "name",
        "#attrName2": "email",
      },
      ExpressionAttributeValues: {
        ":name": requestBody.name,
        ":email": requestBody.email,
      },
      ReturnValues: "ALL_NEW",
    };
    return db.dynamoDB.update(params).promise();
  },
};

export default customersDb;
