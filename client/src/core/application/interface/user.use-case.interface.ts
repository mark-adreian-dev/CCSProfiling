import type { User } from "@/core/domain/entity/user.entity";
import type { FacultyRequest } from "@/core/domain/schema/faculty.schema";
import type { PaginatedUserResponseDTO, UserSuccessDTO } from "@/core/infrastructure/dto/user.dto";
import type { PaginationParams } from "@/core/utils/types/pagination-params.types";

export interface UserUseCaseInterface {
  getAllFacultyProfile(params: PaginationParams<User>): Promise<PaginatedUserResponseDTO>;
  getAllStudentProfile(params: PaginationParams<User>): Promise<PaginatedUserResponseDTO>;
  getFacultyProfileByID(id: number): Promise<UserSuccessDTO>;
  addFaculty(facultyData: FacultyRequest): Promise<UserSuccessDTO>;
  editFaculty(facultyData: FacultyRequest, facultyId: number): Promise<UserSuccessDTO>;
}
