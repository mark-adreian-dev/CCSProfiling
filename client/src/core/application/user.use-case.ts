import type { User } from "../domain/entity/user.entity";
import type { PaginatedUserResponseDTO } from "../infrastructure/dto/user.dto";
import type { UserRepositoryInterface } from "../infrastructure/repository/interface/user.repository.interface";
import type { PaginationParams } from "../utils/types/pagination-params.types";
import type { UserUseCaseInterface } from "./interface/user.use-case.interface";

export class UserUserCase implements UserUseCaseInterface {
  constructor(private repository: UserRepositoryInterface) {}

  async getAllFacultyProfile(params: PaginationParams<User>): Promise<PaginatedUserResponseDTO> {
    return await this.repository.getAllFacultyData(params);
  }

  async getAllStudentProfile(params: PaginationParams<User>): Promise<PaginatedUserResponseDTO> {
    return await this.repository.getAllStudentData(params);
  }
}
