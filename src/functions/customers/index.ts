import schema from "./schemas/schemaCreate";
import { handlerPath } from "@libs/handler-resolver";

export default {
  createCustomers: {
    handler: `${handlerPath(__dirname)}/createCustomers.main`,
    events: [
      {
        http: {
          method: "post",
          path: "customers/create",
          request: {
            schemas: {
              "application/json": schema,
            },
          },
        },
      },
    ],
  },
  searchCustomers: {
    handler: `${handlerPath(__dirname)}/searchCustomers.main`,
    events: [
      {
        http: {
          method: "get",
          path: "customers/search",
        },
      },
    ],
  },
  deleteCustomers: {
    handler: `${handlerPath(__dirname)}/deleteCustomers.main`,
    events: [
      {
        http: {
          method: "delete",
          path: "customers/delete",
        },
      },
    ],
  },
  updateCustomers: {
    handler: `${handlerPath(__dirname)}/updateCustomers.main`,
    events: [
      {
        http: {
          method: "put",
          path: "customers/update",
        },
      },
    ],
  },
  getByIdCustomers: {
    handler: `${handlerPath(__dirname)}/getByIdCustomers.main`,
    events: [
      {
        http: {
          method: "get",
          path: "customers/get-by-id",
        },
      },
    ],
  },
  getAllCustomers: {
    handler: `${handlerPath(__dirname)}/getAllCustomers.main`,
    events: [
      {
        http: {
          method: "get",
          path: "customers/get-all",
        },
      },
    ],
  },
  protectRoutesJwt: {
    handler: `${handlerPath(__dirname)}/protectRoutesJwt.main`,
    events: [
      {
        http: {
          method: "post",
          path: "customers/protect-generate-token",
        },
      },
    ],
  },
};
