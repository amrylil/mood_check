import * as bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { HTTPException } from "hono/http-exception";
import { IAuthRepository, IAuthService } from "../contract";
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  UserResponseDto,
} from "../dtos/auth.dto";
import { AuthRepository } from "../repositories/auth.repository";

const mapToUserResponse = (user: {
  id: string;
  email: string;
  name: string | null;
}): UserResponseDto => ({
  id: user.id,
  email: user.email,
  name: user.name ?? null,
});

export class AuthService implements IAuthService {
  private repo: IAuthRepository;
  private JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

  constructor() {
    this.repo = new AuthRepository();
  }

  async register(dto: RegisterRequestDto): Promise<UserResponseDto> {
    const existingUser = await this.repo.findByEmail(dto.email);
    if (existingUser) {
      throw new HTTPException(409, {
        message: "User with this email already exists",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

    const newUser = await this.repo.create(dto, hashedPassword);

    return mapToUserResponse(newUser);
  }

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.repo.findByEmail(dto.email);
    if (!user) {
      throw new HTTPException(401, {
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new HTTPException(401, {
        message: "Invalid email or password",
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
      exp: Date.now() / 1000 + 60 * 60 * 24,
    };
    const token = await sign(payload, this.JWT_SECRET);

    return {
      token,
      user: mapToUserResponse(user),
    };
  }
}
