import type { User } from "../domain/entity/user.entity";
import type { FacultyRequest } from "../domain/schema/faculty.schema";
import type { StudentRequest } from "../domain/schema/student.schema";
import type { PaginatedUserResponseDTO, UserSuccessDTO } from "../infrastructure/dto/user.dto";
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

  async getFacultyProfileByID(id: number): Promise<UserSuccessDTO> {
    return await this.repository.getFacultyByID(id);
  }

  async addFaculty(facultyData: FacultyRequest): Promise<UserSuccessDTO> {
    return await this.repository.addFaculty(facultyData);
  }

  async editFaculty(facultyData: FacultyRequest, facultyId: number): Promise<UserSuccessDTO> {
    return await this.repository.editFaculty(facultyData, facultyId);
  }

  async addStudent(studentData: StudentRequest): Promise<UserSuccessDTO> {
    return await this.repository.addStudent(studentData);
  }

  async editStudent(studentData: StudentRequest, studentId: number): Promise<UserSuccessDTO> {
    return await this.repository.editStudent(studentData, studentId);
  }

  async getStudentProfileByID(id: number): Promise<UserSuccessDTO> {
    return await this.repository.getStudentByID(id);
  }
}
