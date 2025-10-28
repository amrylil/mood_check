import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { MoodHandler } from "../features/mood/handlers/mood.handler";
import { createMoodRequestSchema } from "../features/mood/dtos/mood.dto";

const router = new Hono();

router.post(
  "/",
  zValidator("json", createMoodRequestSchema),
  MoodHandler.create
);

router.get("/summary/:userId", MoodHandler.getSummary);
router.get("/:userId", MoodHandler.getByUserId);

export default router;
