import type { Program } from "@/core/domain/entity/program.entity";
import type { PaginationParams } from "@/core/utils/types/pagination-params.types";
import type { PaginatedProgramResponseDTO } from "@/core/infrastructure/dto/program.dto";

export interface ProgramUseCaseInterface {
  getAllProgramData(params: PaginationParams<Program>): Promise<PaginatedProgramResponseDTO>;
}
