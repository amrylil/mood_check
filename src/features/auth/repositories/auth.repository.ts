import { PrismaClient, User } from "@prisma/client";
import { IAuthRepository } from "../contract";
import { RegisterRequestDto } from "../dtos/auth.dto";

export class AuthRepository implements IAuthRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(
    data: RegisterRequestDto,
    hashedPassword: string
  ): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });
  }
}
