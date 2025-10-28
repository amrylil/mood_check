import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createMoodRequestSchema } from "../features/mood/dtos/mood.dto";
import { MoodHandler } from "../features/mood/handlers/mood.handler";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = new Hono();

router.post(
  "/",
  authMiddleware,
  zValidator("json", createMoodRequestSchema),
  MoodHandler.create
);

router.get("/summary", authMiddleware, MoodHandler.getSummary);

router.get("/", authMiddleware, MoodHandler.getByUserId);

export default router;
