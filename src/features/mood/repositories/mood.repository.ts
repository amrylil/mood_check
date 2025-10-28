import { PrismaClient, MoodReport } from "@prisma/client";
import { IMoodRepository } from "../contract";
import { CreateMoodRequestDto } from "../dtos/mood.dto";

export class MoodRepository implements IMoodRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(dto: CreateMoodRequestDto): Promise<MoodReport> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.moodReport.create({
      data: {
        userId: dto.userId,
        date: today,
        mood_score: dto.mood_score,
        mood_label: dto.mood_label,
        notes: dto.notes,
      },
    });
  }

  async findByUserId(userId: string): Promise<MoodReport[]> {
    return this.prisma.moodReport.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        date: "desc",
      },
    });
  }

  async getSummaryByUserId(userId: string, startDate: Date, endDate: Date) {
    return this.prisma.moodReport.aggregate({
      _avg: {
        mood_score: true,
      },
      _count: {
        _all: true,
      },
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  }
}
