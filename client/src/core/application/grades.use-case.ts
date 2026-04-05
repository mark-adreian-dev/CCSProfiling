import type { CurriculumSuccessDTO, GradesSuccessDTO } from "../infrastructure/dto/grades.dto";
import type { GradesRepositoryInterface } from "../infrastructure/repository/interface/grades.reposity.interface";
import type { GradesUseCaseInterface } from "./interface/grades.use-case.interface";

export class GradesUseCase implements GradesUseCaseInterface {
  constructor(private repository: GradesRepositoryInterface) {}

  async getGradesData(id: number): Promise<GradesSuccessDTO> {
    return this.repository.getStudentGradesData(id);
  }

  async getCurriculumData(): Promise<CurriculumSuccessDTO> {
    return this.repository.getCurriculumData();
  }
}
