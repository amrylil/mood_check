import { IMoodRepository, IMoodService } from "../contract";
import {
  CreateMoodRequestDto,
  MoodResponseDto,
  MoodSummaryResponseDto,
} from "../dtos/mood.dto";
import { MoodRepository } from "../repositories/mood.repository";

export class MoodService implements IMoodService {
  private repo: IMoodRepository;

  constructor() {
    this.repo = new MoodRepository();
  }

  private mapToResponse(report: {
    id: string;
    date: Date;
    mood_score: number;
    mood_label: string | null;
    notes: string | null;
    userId: string;
  }): MoodResponseDto {
    return {
      ...report,
      date: report.date.toISOString(),
      mood_label: report.mood_label ?? null,
      notes: report.notes ?? null,
    };
  }

  async create(
    dto: CreateMoodRequestDto,
    userId: string
  ): Promise<MoodResponseDto> {
    const createdReport = await this.repo.create(dto, userId);
    return this.mapToResponse(createdReport);
  }

  async getByUserId(userId: string): Promise<MoodResponseDto[]> {
    const reports = await this.repo.findByUserId(userId);
    return reports.map(this.mapToResponse);
  }

  async getSummary(userId: string): Promise<MoodSummaryResponseDto> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
    startDate.setHours(0, 0, 0, 0);

    const summary = await this.repo.getSummaryByUserId(
      userId,
      startDate,
      endDate
    );

    return {
      userId: userId,
      period: "30-hari-terakhir",
      average_score: summary._avg.mood_score || 0,
      total_reports: summary._count._all,
    };
  }
}
