import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";
import { Env } from "hono";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";
export const authMiddleware = createMiddleware(
  jwt({
    secret: JWT_SECRET,
  })
);

export type ProtectedEnv = Env & {
  Variables: {
    jwtPayload: {
      id: string;
      email: string;
    };
  };
};
