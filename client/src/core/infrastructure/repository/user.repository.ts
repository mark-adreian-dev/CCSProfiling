import { API_CONFIG } from "@/core/config/api.config";
import api from "@/core/utils/axios/axios-instance";
import { type PaginatedUserResponseDTO, PaginatedUserResponseDTOSchema } from "../dto/user.dto";
import type { UserRepositoryInterface } from "./interface/user.repository.interface";
import type { PaginationParams } from "@/core/utils/types/pagination-params.types";
import type { User } from "@/core/domain/entity/user.entity";

export class UserRepository implements UserRepositoryInterface {
  async getAllFacultyData(params: PaginationParams<User>): Promise<PaginatedUserResponseDTO> {
    const { data } = await api.get(API_CONFIG.enpoints.USER.FACULTY.GET_ALL, {
      params: params,
    });
    return data;
  }

  async getAllStudentData(params: PaginationParams<User>): Promise<PaginatedUserResponseDTO> {
    const { data } = await api.get(API_CONFIG.enpoints.USER.STUDENT.GET_ALL, {
      params: params,
    });
    return PaginatedUserResponseDTOSchema.parse(data);
  }
}
