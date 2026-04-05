import { API_CONFIG } from "@/core/config/api.config";
import api from "@/core/utils/axios/axios-instance";
import { type PaginatedUserResponseDTO, PaginatedUserResponseDTOSchema, type UserSuccessDTO, UserSuccessDTOSchema } from "../dto/user.dto";
import type { UserRepositoryInterface } from "./interface/user.repository.interface";
import type { PaginationParams } from "@/core/utils/types/pagination-params.types";
import type { User } from "@/core/domain/entity/user.entity";
import type { FacultyRequest } from "@/core/domain/schema/faculty.schema";
import { base64ToFile } from "@/core/helpers/base64ToFile";
import type { StudentRequest } from "@/core/domain/schema/student.schema";

export class UserRepository implements UserRepositoryInterface {
  async getAllFacultyData(params: PaginationParams<User>): Promise<PaginatedUserResponseDTO> {
    const { data } = await api.get(API_CONFIG.endpoints.USER.FACULTIES, {
      params: params,
    });
    return PaginatedUserResponseDTOSchema.parse(data);
  }

  async getAllStudentData(params: PaginationParams<User>): Promise<PaginatedUserResponseDTO> {
    const { data } = await api.get(API_CONFIG.endpoints.USER.STUDENTS, {
      params: params,
    });
    return PaginatedUserResponseDTOSchema.parse(data);
  }

  async getFacultyByID(id: number): Promise<UserSuccessDTO> {
    const { data } = await api.get(`${API_CONFIG.endpoints.USER.FACULTIES}/${id}`);
    return UserSuccessDTOSchema.parse(data);
  }

  async addFaculty(facultyData: FacultyRequest): Promise<UserSuccessDTO> {
    const payload = new FormData();

    // 1. Process the image FIRST
    const picValue = facultyData.profile_picture as unknown;

    if (picValue instanceof File) {
      payload.append("profile_picture", picValue);
    } else if (typeof picValue === "string" && picValue.startsWith("data:")) {
      const convertedFile = await base64ToFile(picValue, "profile_picture.png");
      payload.append("profile_picture", convertedFile);
    }

    Object.keys(facultyData).forEach((key) => {
      if (key === "profile_picture") return;
      const value = facultyData[key as keyof FacultyRequest];

      if (value !== null && value !== undefined && value !== "") {
        if (value instanceof Date) {
          const yyyy = value.getFullYear();
          const mm = String(value.getMonth() + 1).padStart(2, "0");
          const dd = String(value.getDate()).padStart(2, "0");
          payload.append(key, `${yyyy}-${mm}-${dd}`);
        } else {
          payload.append(key, String(value));
        }
      }
    });

    const { data } = await api.post(API_CONFIG.endpoints.USER.FACULTIES, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": undefined,
      },
    });

    return UserSuccessDTOSchema.parse(data);
  }

  async editFaculty(facultyData: FacultyRequest, facultyId: number): Promise<UserSuccessDTO> {
    const payload = new FormData();

    // IMPORTANT: Tell Laravel to treat this POST as a PATCH
    payload.append("_method", "PATCH");

    // 1. Process the image
    const picValue = facultyData.profile_picture as unknown;
    if (picValue instanceof File) {
      payload.append("profile_picture", picValue);
    } else if (typeof picValue === "string" && picValue.startsWith("data:")) {
      const convertedFile = await base64ToFile(picValue, "profile_picture.png");
      payload.append("profile_picture", convertedFile);
    } else if (picValue === null) {
      payload.append("profile_picture", "");
    } else {
      payload.append("profile_picture", picValue as string);
    }

    // 2. Process other fields
    Object.keys(facultyData).forEach((key) => {
      if (key === "profile_picture") return;
      const value = facultyData[key as keyof FacultyRequest];

      if (value !== null && value !== undefined && value !== "") {
        if (value instanceof Date) {
          payload.append(key, value.toISOString().split("T")[0]);
        } else {
          payload.append(key, value);
        }
      }
    });

    // 3. Use .post() instead of .patch()
    const { data } = await api.post(`${API_CONFIG.endpoints.USER.FACULTIES}/${facultyId}`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    return UserSuccessDTOSchema.parse(data);
  }

  async addStudent(studentData: StudentRequest): Promise<UserSuccessDTO> {
    const payload = new FormData();

    // 1. Process the image FIRST
    const picValue = studentData.profile_picture as unknown;

    if (picValue instanceof File) {
      payload.append("profile_picture", picValue);
    } else if (typeof picValue === "string" && picValue.startsWith("data:")) {
      const convertedFile = await base64ToFile(picValue, "profile_picture.png");
      payload.append("profile_picture", convertedFile);
    }

    Object.keys(studentData).forEach((key) => {
      if (key === "profile_picture") return;
      const value = studentData[key as keyof StudentRequest];

      if (value !== null && value !== undefined && value !== "") {
        if (value instanceof Date) {
          payload.append(key, value.toISOString().split("T")[0]);
        } else {
          payload.append(key, String(value));
        }
      }
    });

    const { data } = await api.post(API_CONFIG.endpoints.USER.STUDENTS, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": undefined,
      },
    });

    return UserSuccessDTOSchema.parse(data);
  }

  async editStudent(studentData: StudentRequest, studentId: number): Promise<UserSuccessDTO> {
    const payload = new FormData();
    // IMPORTANT: Tell Laravel to treat this POST as a PATCH
    payload.append("_method", "PATCH");

    // 1. Process the image
    const picValue = studentData.profile_picture as unknown;
    if (picValue instanceof File) {
      payload.append("profile_picture", picValue);
    } else if (typeof picValue === "string" && picValue.startsWith("data:")) {
      const convertedFile = await base64ToFile(picValue, "profile_picture.png");
      payload.append("profile_picture", convertedFile);
    } else if (picValue === null) {
      payload.append("profile_picture", "");
    } else {
      payload.append("profile_picture", picValue as string);
    }

    // 2. Process other fields
    Object.keys(studentData).forEach((key) => {
      if (key === "profile_picture") return;

      const value = studentData[key as keyof StudentRequest];

      if (value !== null && value !== undefined && value !== "") {
        if (value instanceof Date) {
          if (value instanceof Date) {
            const yyyy = value.getFullYear();
            const mm = String(value.getMonth() + 1).padStart(2, "0");
            const dd = String(value.getDate()).padStart(2, "0");
            payload.append(key, `${yyyy}-${mm}-${dd}`);
          }
        } else {
          payload.append(key, value);
        }
      }
    });

    // 3. Use .post() instead of .patch()
    const { data } = await api.patch(`${API_CONFIG.endpoints.USER.STUDENTS}/${studentId}`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    return UserSuccessDTOSchema.parse(data);
  }

  async getStudentByID(id: number): Promise<UserSuccessDTO> {
    const { data } = await api.get(`${API_CONFIG.endpoints.USER.STUDENTS}/${id}`);
    return UserSuccessDTOSchema.parse(data);
  }
}
