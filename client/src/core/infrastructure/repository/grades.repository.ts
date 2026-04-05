import { API_CONFIG } from "@/core/config/api.config";
import api from "@/core/utils/axios/axios-instance";
import type { GradesRepositoryInterface } from "./interface/grades.reposity.interface";
import { CurriculumSuccessDTOSchema, GradesSuccessDTOSchema, type CurriculumSuccessDTO, type GradesSuccessDTO } from "../dto/grades.dto";

export class GradesRepository implements GradesRepositoryInterface {
  async getStudentGradesData(id: number): Promise<GradesSuccessDTO> {
    const { data } = await api.get(`${API_CONFIG.endpoints.GRADE}/${id}`);
    return GradesSuccessDTOSchema.parse(data);
  }

  async getCurriculumData(): Promise<CurriculumSuccessDTO> {
    const { data } = await api.get(`${API_CONFIG.endpoints.CURRICULUM}`);
    return CurriculumSuccessDTOSchema.parse(data);
  }
}
