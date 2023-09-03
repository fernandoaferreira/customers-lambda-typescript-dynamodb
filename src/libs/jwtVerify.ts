import { verify } from "jsonwebtoken";
import env from "../functions/customers/envs/envs";

const jwtVerify = async (token: string) => {
  try {
    const SECRET_JWT = env.SECRET_JWT;
    return verify(token, SECRET_JWT);
  } catch (error) {
    return null
  }
};

export default jwtVerify;
