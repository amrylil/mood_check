import { MoodReport } from "@prisma/client";
import {
  CreateMoodRequestDto,
  MoodResponseDto,
  MoodSummaryResponseDto,
} from "./dtos/mood.dto";

export interface IMoodRepository {
  create(dto: CreateMoodRequestDto): Promise<MoodReport>;

  findByUserId(userId: string): Promise<MoodReport[]>;

  getSummaryByUserId(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<{
    _avg: { mood_score: number | null };
    _count: { _all: number };
  }>;
}

export interface IMoodService {
  create(dto: CreateMoodRequestDto): Promise<MoodResponseDto>;

  getByUserId(userId: string): Promise<MoodResponseDto[]>;

  getSummary(userId: string): Promise<MoodSummaryResponseDto>;
}
