import {
  createMoodRequestSchema,
  moodResponseSchema,
  moodSummaryResponseSchema,
} from "../features/mood/dtos/mood.dto";
import { registry } from "./registry";

registry.register("CreateMoodRequest", createMoodRequestSchema);
registry.register("MoodResponse", moodResponseSchema);
registry.register("MoodSummaryResponse", moodSummaryResponseSchema);

const securityScheme = [{ bearerAuth: [] }];

registry.registerPath({
  method: "post",
  path: "/mood",
  tags: ["Mood"],
  summary: "Create new mood report (Protected)",
  security: securityScheme,
  request: {
    body: {
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CreateMoodRequest" },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Mood report created successfully",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/MoodResponse" },
        },
      },
    },
    400: { description: "Validation error" },
    401: { description: "Unauthorized" },
    403: { description: "Forbidden" },
    409: { description: "Mood report for this date already exists" },
  },
});

registry.registerPath({
  method: "get",
  path: "/mood",
  tags: ["Mood"],
  summary: "Get my mood history (Protected)",
  security: securityScheme,
  responses: {
    200: {
      description: "List of my mood reports",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/MoodResponse" },
          },
        },
      },
    },
    401: { description: "Unauthorized" },
    403: { description: "Forbidden" },
  },
});

registry.registerPath({
  method: "get",
  path: "/mood/summary",
  tags: ["Mood"],
  summary: "Get my mood summary (Protected)",
  security: securityScheme,
  responses: {
    200: {
      description: "My mood summary retrieved successfully",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/MoodSummaryResponse" },
        },
      },
    },
    401: { description: "Unauthorized" },
    403: { description: "Forbidden" },
  },
});
