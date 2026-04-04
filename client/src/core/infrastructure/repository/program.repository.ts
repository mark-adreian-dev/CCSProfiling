import { API_CONFIG } from "@/core/config/api.config";
import api from "@/core/utils/axios/axios-instance";
import type { PaginationParams } from "@/core/utils/types/pagination-params.types";
import type { Program } from "@/core/domain/entity/program.entity";
import type { ProgramRepositoryInterface } from "./interface/program.reposity.interface";
import { PaginatedProgramResponseDTOSchema, type PaginatedProgramResponseDTO } from "../dto/program.dto";

export class ProgramRepository implements ProgramRepositoryInterface {
  async getAllProgramData(params: PaginationParams<Program>): Promise<PaginatedProgramResponseDTO> {
    const { data } = await api.get(API_CONFIG.endpoints.PROGRAMS, {
      params,
    });

    return PaginatedProgramResponseDTOSchema.parse(data);
  }
}
