import { User } from "@prisma/client";
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  UserResponseDto,
} from "./dtos/auth.dto";

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;

  create(data: RegisterRequestDto, hashedPassword: string): Promise<User>;
}

export interface IAuthService {
  register(dto: RegisterRequestDto): Promise<UserResponseDto>;

  login(dto: LoginRequestDto): Promise<LoginResponseDto>;
}
