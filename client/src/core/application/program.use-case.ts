import type { Program } from "../domain/entity/program.entity";
import type { PaginationParams } from "../utils/types/pagination-params.types";
import type { PaginatedProgramResponseDTO } from "../infrastructure/dto/program.dto";
import type { ProgramRepositoryInterface } from "../infrastructure/repository/interface/program.reposity.interface";
import type { ProgramUseCaseInterface } from "./interface/program.use-case.interface";

export class ProgramUseCase implements ProgramUseCaseInterface {
  constructor(private repository: ProgramRepositoryInterface) {}

  async getAllProgramData(params: PaginationParams<Program>): Promise<PaginatedProgramResponseDTO> {
    const response = await this.repository.getAllProgramData(params);
    return response;
  }
}
