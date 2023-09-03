import { sign } from "jsonwebtoken";
import { middyfy } from "@libs/lambda";
import env from "./envs/envs";
const SECRET_JWT = env.SECRET_JWT;
const USER_ADMIN = env.USER_ADMIN;
const PASSWORD_ADMIN = env.PASSWORD_ADMIN;

const protectRoutesJwt = async (event) => {
  try {
    const user = event.body.user;
    const password = event.body.password;

    if (USER_ADMIN === user && PASSWORD_ADMIN === password) {
      const token = sign({ user }, SECRET_JWT, {
        expiresIn: 300,
      });
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Token Generated successfully",
          token: token,
        }),
      };
    }
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "User Admin Invalid",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Erro ao gerar token",
        error: error.message,
      }),
    };
  }
};

export const main = middyfy(protectRoutesJwt);
