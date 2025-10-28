import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { AuthHandler } from "../features/auth/handler/auth.handler";
import {
  loginRequestSchema,
  registerRequestSchema,
} from "../features/auth/dtos/auth.dto";

const router = new Hono();

router.post(
  "/register",
  zValidator("json", registerRequestSchema),
  AuthHandler.register
);

router.post(
  "/login",
  zValidator("json", loginRequestSchema),
  AuthHandler.login
);

export default router;
