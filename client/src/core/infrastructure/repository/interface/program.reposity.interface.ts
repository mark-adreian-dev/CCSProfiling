import type { PaginationParams } from "@/core/utils/types/pagination-params.types";
import type { Program } from "@/core/domain/entity/program.entity";
import type { PaginatedProgramResponseDTO } from "../../dto/program.dto";

export interface ProgramRepositoryInterface {
  getAllProgramData(params: PaginationParams<Program>): Promise<PaginatedProgramResponseDTO>;
}
