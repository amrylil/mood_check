import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";
import { generateOpenApiSpec } from "./openapi";
import { ApiResponse } from "./utils/apiResponse";
import logger from "./utils/logger";
import moodRouter from "./routes/mood.routes";
import authRouter from "./routes/auth.routes";

const app = new Hono();

app.onError((err: any, c) => {
  const statusCode = err.statusCode || 500;

  logger.error({
    message: err.message,
    stack: err.stack,
    path: c.req.path,
    method: c.req.method,
  });

  const errorBody = ApiResponse.error(
    {
      code: statusCode,
      message: err.message || "Internal Server Error",
      details: err.details || (err.issues ? err.issues : null),
    },
    statusCode
  );

  return c.json(errorBody, statusCode);
});

const v1 = new Hono();

v1.get("/docs.json", (c) => c.json(generateOpenApiSpec()));

v1.get(
  "/docs/ui",
  swaggerUI({
    url: "http://localhost:3000/api/v1/docs.json",
  })
);

v1.route("/mood", moodRouter);
v1.route("/auth", authRouter);

app.route("/api/v1", v1);

app.get("/health", (c) => {
  return c.text("Server is healthy and running!", 200);
});

export default app;
