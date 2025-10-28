import {
  createMoodRequestSchema,
  moodResponseSchema,
  moodSummaryResponseSchema,
} from "../features/mood/dtos/mood.dto";
import { registry } from "./registry";

registry.register("CreateMoodRequest", createMoodRequestSchema);
registry.register("MoodResponse", moodResponseSchema);
registry.register("MoodSummaryResponse", moodSummaryResponseSchema);

registry.registerPath({
  method: "post",
  path: "/mood",
  tags: ["Mood"],
  summary: "Create new mood report",
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
    409: { description: "Mood report for this date already exists" },
  },
});

registry.registerPath({
  method: "get",
  path: "/mood/{userId}",
  tags: ["Mood"],
  summary: "Get mood history for a user",
  parameters: [
    {
      name: "userId",
      in: "path",
      required: true,
      schema: { type: "string", format: "uuid" },
    },
  ],
  responses: {
    200: {
      description: "List of all mood reports for the user",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/MoodResponse" },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/mood/summary/{userId}",
  tags: ["Mood"],
  summary: "Get mood summary for a user",
  parameters: [
    {
      name: "userId",
      in: "path",
      required: true,
      schema: { type: "string", format: "uuid" },
    },
  ],
  responses: {
    200: {
      description: "Mood summary retrieved successfully",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/MoodSummaryResponse" },
        },
      },
    },
  },
});
