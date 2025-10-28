import { Context } from "hono"; // Env dihapus
import { ApiResponse } from "../../../utils/apiResponse";
import { AuthService } from "../usecases/auth.usecase";
import { LoginRequestDto, RegisterRequestDto } from "../dtos/auth.dto";

const service = new AuthService();

export class AuthHandler {
  static register = async (c: Context) => {
    try {
      const dto = (await c.req.json()) as RegisterRequestDto;

      const newUser = await service.register(dto);

      const response = ApiResponse.success(
        newUser,
        "User registered successfully",
        undefined
      );
      return c.json(response, 201);
    } catch (err: any) {
      if (err.code === "P2002") {
        const errorBody = ApiResponse.error(
          { message: "User with this email already exists" },
          409
        );
        return c.json(errorBody, 409);
      }
      throw err;
    }
  };

  static login = async (c: Context) => {
    try {
      const dto = (await c.req.json()) as LoginRequestDto;

      const loginData = await service.login(dto);

      const response = ApiResponse.success(loginData, "Login successful");
      return c.json(response, 200);
    } catch (err: any) {
      if (err.code === "AUTH_401") {
        const errorBody = ApiResponse.error(
          { message: err.message || "Invalid email or password" },
          401
        );
        return c.json(errorBody, 401);
      }
      throw err;
    }
  };
}
