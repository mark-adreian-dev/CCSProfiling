import type { LoginRequest } from "@/core/domain/schema/auth.schema";
import type { AuthSuccessDTO } from "../../dto/auth.dto";
import type { UserSuccessDTO } from "../../dto/user.dto";

export interface AuthRepositoryInterface {
  login(credentials: LoginRequest): Promise<AuthSuccessDTO>;
  logout(): Promise<AuthSuccessDTO>;
  fetchCSRFToken(): Promise<boolean>;
  getUser(): Promise<UserSuccessDTO>;
}
