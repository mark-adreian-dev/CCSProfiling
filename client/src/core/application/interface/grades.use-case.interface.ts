import type { CurriculumSuccessDTO, GradesSuccessDTO } from "@/core/infrastructure/dto/grades.dto";

export interface GradesUseCaseInterface {
  getGradesData(gradesId: number): Promise<GradesSuccessDTO>;
  getCurriculumData(): Promise<CurriculumSuccessDTO>;
}
