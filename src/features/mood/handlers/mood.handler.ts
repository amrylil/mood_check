import { Context } from "hono";
import { MoodService } from "../usecases/mood.usecase";
import { ApiResponse } from "../../../utils/apiResponse";
import { CreateMoodRequestDto } from "../dtos/mood.dto";
import { zValidator } from "@hono/zod-validator";

const service = new MoodService();

export class MoodHandler {
  static create = async (c: Context) => {
    try {
      const dto = (await c.req.json()) as CreateMoodRequestDto;
      const payload = c.get("jwtPayload");
      const userIdFromToken = payload.id;
      const created = await service.create(dto, userIdFromToken);

      const responseBody = ApiResponse.success(
        created,
        "Mood report created successfully",
        undefined
      );
      return c.json(responseBody, 201);
    } catch (err: any) {
      if (err.code === "P2002") {
        const errorBody = ApiResponse.error(
          { message: "Mood report for this date already exists" },
          409
        );
        return c.json(errorBody, 409);
      }
      throw err;
    }
  };

  static getByUserId = async (c: Context) => {
    const payload = c.get("jwtPayload");
    const userIdFromToken = payload.id;
    const all = await service.getByUserId(userIdFromToken);

    const responseBody = ApiResponse.success(
      all,
      "Mood history fetched successfully"
    );
    return c.json(responseBody, 200);
  };

  static getSummary = async (c: Context) => {
    const payload = c.get("jwtPayload");
    const userIdFromToken = payload.id;
    const summary = await service.getSummary(userIdFromToken);

    const responseBody = ApiResponse.success(
      summary,
      "Mood summary fetched successfully"
    );
    return c.json(responseBody, 200);
  };
}
