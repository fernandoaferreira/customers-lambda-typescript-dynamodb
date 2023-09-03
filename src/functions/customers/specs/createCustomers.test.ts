
jest.mock("../../../db/repository/dynamoDb/customers", () => ({
  getById: jest.fn(),
  updateCustomer: jest.fn(),
}));


