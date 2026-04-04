import type { PaginationParams } from "@/core/utils/types/pagination-params.types";
import type { PaginatedUserResponseDTO, UserSuccessDTO } from "../../dto/user.dto";
import type { User } from "@/core/domain/entity/user.entity";
import type { FacultyRequest } from "@/core/domain/schema/faculty.schema";
import type { StudentRequest } from "@/core/domain/schema/student.schema";

export interface UserRepositoryInterface {
  getAllFacultyData(params: PaginationParams<User>): Promise<PaginatedUserResponseDTO>;
  getAllStudentData(params: PaginationParams<User>): Promise<PaginatedUserResponseDTO>;
  getFacultyByID(id: number): Promise<UserSuccessDTO>;
  addFaculty(facultyData: FacultyRequest): Promise<UserSuccessDTO>;
  editFaculty(facultyData: FacultyRequest, facultyId: number): Promise<UserSuccessDTO>;
  addStudent(studentData: StudentRequest): Promise<UserSuccessDTO>;
  editStudent(facultyData: StudentRequest, studentId: number): Promise<UserSuccessDTO>;
  getStudentByID(id: number): Promise<UserSuccessDTO>;
}
