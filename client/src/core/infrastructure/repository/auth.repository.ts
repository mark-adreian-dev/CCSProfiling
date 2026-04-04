// src/core/infrastructure/repository/AuthRepository.ts

import type { AuthRepositoryInterface } from "./interface/auth.repository.interface";
import type { LoginRequest } from "@/core/domain/schema/auth.schema";
import { AuthSuccessDTOSchema, type AuthSuccessDTO } from "../dto/auth.dto";
import { API_CONFIG } from "@/core/config/api.config";

import { UserSuccessDTOSchema, type UserSuccessDTO } from "../dto/user.dto";
import api from "@/core/utils/axios/axios-instance";

export class AuthRepository implements AuthRepositoryInterface {
  async fetchCSRFToken(): Promise<boolean> {
    await api.get(API_CONFIG.endpoints.AUTH.CSRF, {
      baseURL: API_CONFIG.baseUrlDomain,
    });
    return true;
  }

  async login(credentials: LoginRequest): Promise<AuthSuccessDTO> {
    const { data } = await api.post(API_CONFIG.endpoints.AUTH.LOGIN, credentials);
    return AuthSuccessDTOSchema.parse(data);
  }

  async logout(): Promise<AuthSuccessDTO> {
    const { data } = await api.post(API_CONFIG.endpoints.AUTH.LOGOUT);
    return AuthSuccessDTOSchema.parse(data);
  }

  async getUser(): Promise<UserSuccessDTO> {
    const { data } = await api.get(API_CONFIG.endpoints.AUTH.USER);
    return UserSuccessDTOSchema.parse(data);
  }
}
