import type { CurriculumSuccessDTO, GradesSuccessDTO } from "../../dto/grades.dto";

export interface GradesRepositoryInterface {
  getStudentGradesData(id: number): Promise<GradesSuccessDTO>;
  getCurriculumData(): Promise<CurriculumSuccessDTO>;
}
