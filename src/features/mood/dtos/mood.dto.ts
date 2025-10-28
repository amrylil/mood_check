import { z } from "../../../config/zod-openapi";

export const createMoodRequestSchema = z.object({
  userId: z.string().uuid({ message: "User ID harus berupa UUID yang valid" }),
  mood_score: z
    .number()
    .int()
    .min(1, { message: "Skor mood minimal 1" })
    .max(5, { message: "Skor mood maksimal 5" })
    .openapi({ example: 4 }),
  mood_label: z.string().optional().openapi({ example: "Senang" }),
  notes: z.string().optional().openapi({ example: "Meeting berjalan lancar" }),
});

export const moodResponseSchema = z.object({
  id: z.string().uuid(),
  date: z.string().datetime(),
  mood_score: z.number().int(),
  mood_label: z.string().nullable(),
  notes: z.string().nullable(),
  userId: z.string().uuid(),
});

export const moodSummaryResponseSchema = z.object({
  userId: z.string().uuid(),
  period: z.string().openapi({ example: "30-hari-terakhir" }),
  average_score: z.number().openapi({ example: 3.75 }),
  total_reports: z.number().int().openapi({ example: 20 }),
});

export type CreateMoodRequestDto = z.infer<typeof createMoodRequestSchema>;
export type MoodResponseDto = z.infer<typeof moodResponseSchema>;
export type MoodSummaryResponseDto = z.infer<typeof moodSummaryResponseSchema>;
