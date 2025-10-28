import {
  registerRequestSchema,
  userResponseSchema,
  loginRequestSchema,
  loginResponseSchema,
} from "../features/auth/dtos/auth.dto";
import { registry } from "./registry";

registry.register("RegisterRequest", registerRequestSchema);
registry.register("UserResponse", userResponseSchema);
registry.register("LoginRequest", loginRequestSchema);
registry.register("LoginResponse", loginResponseSchema);

registry.registerPath({
  method: "post",
  path: "/auth/register",
  tags: ["Auth"],
  summary: "Register a new user",
  request: {
    body: {
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/RegisterRequest" },
        },
      },
    },
  },
  responses: {
    201: {
      description: "User registered successfully",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/UserResponse" },
        },
      },
    },
    400: { description: "Validation error" },
    409: { description: "User with this email already exists" },
  },
});

registry.registerPath({
  method: "post",
  path: "/auth/login",
  tags: ["Auth"],
  summary: "Login a user",
  request: {
    body: {
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/LoginRequest" },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Login successful",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/LoginResponse" },
        },
      },
    },
    400: { description: "Validation error" },
    401: { description: "Invalid email or password" },
  },
});
