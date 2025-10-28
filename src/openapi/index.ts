import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import fs from "fs";
import path from "path";
import { registry } from "./registry";

const openapiDir = path.join(__dirname);
console.log("[OpenAPI] Loading definitions from:", openapiDir);

fs.readdirSync(openapiDir).forEach((file) => {
  if (file.endsWith(".openapi.ts") && file !== "index.ts") {
    console.log("[OpenAPI] Registering file:", file);
    require(path.join(openapiDir, file));
  }
});

export function generateOpenApiSpec() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  const spec = generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "MOOD CHECK API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3000/api/v1" }],
  });
  spec.components = {
    ...spec.components,
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter JWT token",
      },
    },
  };

  console.log(
    "[OpenAPI] Generated spec with paths:",
    Object.keys(spec.paths || {})
  );
  return spec;
}
