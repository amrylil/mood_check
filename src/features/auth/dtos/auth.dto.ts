import { z } from "../../../config/zod-openapi";

export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  name: z.string().optional(),
});

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const userResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().nullable(),
});

export const loginResponseSchema = z.object({
  token: z.string().openapi({ example: "eyJhbGciOiJIUzI1Ni..." }),
  user: userResponseSchema,
});

export type RegisterRequestDto = z.infer<typeof registerRequestSchema>;
export type LoginRequestDto = z.infer<typeof loginRequestSchema>;

export type UserResponseDto = z.infer<typeof userResponseSchema>;
export type LoginResponseDto = z.infer<typeof loginResponseSchema>;
