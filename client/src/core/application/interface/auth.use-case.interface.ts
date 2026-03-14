import type { LoginRequest } from "@/core/domain/schema/auth.schema";
import type { AuthSuccessDTO } from "@/core/infrastructure/dto/auth.dto";
import type { UserSuccessDTO } from "@/core/infrastructure/dto/user.dto";

export interface AuthUseCaseInterface {
  login(credentials: LoginRequest): Promise<UserSuccessDTO>;
  logout(): Promise<AuthSuccessDTO>;
  getUser(): Promise<UserSuccessDTO>;
}
