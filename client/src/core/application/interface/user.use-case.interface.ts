import type { User } from "@/core/domain/entity/user.entity";
import type { PaginatedUserResponseDTO } from "@/core/infrastructure/dto/user.dto";
import type { PaginationParams } from "@/core/utils/types/pagination-params.types";

export interface UserUseCaseInterface {
  getAllFacultyProfile(params: PaginationParams<User>): Promise<PaginatedUserResponseDTO>;
  getAllStudentProfile(params: PaginationParams<User>): Promise<PaginatedUserResponseDTO>;
}
