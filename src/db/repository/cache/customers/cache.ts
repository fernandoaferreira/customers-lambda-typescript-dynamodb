import cacheConnection from "../../../dataBases/cacheConnection";
import env from "../../../../functions/customers/envs/envs"

const TABLE_NAME = env.TABLE_NAME;
const DATE_CURRENT = new Date().toDateString();

const cache = {
  getAllCustomerCache: async () => {
    const key = `${TABLE_NAME}-${DATE_CURRENT}-getAllCustomers`;
    return cacheConnection.get(key);
  },
  setAllCustomerConnection: async (result: any) => {
    const key = `${TABLE_NAME}-${DATE_CURRENT}-getAllCustomers`;
    return cacheConnection.set(key, result, 15);
  },
};

export default cache;
