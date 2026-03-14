import type { PaginationParams } from "@/core/utils/types/pagination-params.types";
import type { PaginatedUserResponseDTO } from "../../dto/user.dto";
import type { User } from "@/core/domain/entity/user.entity";

export interface UserRepositoryInterface {
  getAllFacultyData(params: PaginationParams<User>): Promise<PaginatedUserResponseDTO>;
  getAllStudentData(params: PaginationParams<User>): Promise<PaginatedUserResponseDTO>;
}
