import type { LoginRequest } from "../domain/schema/auth.schema";
import type { AuthSuccessDTO } from "../infrastructure/dto/auth.dto";
import type { UserSuccessDTO } from "../infrastructure/dto/user.dto";
import type { AuthRepositoryInterface } from "../infrastructure/repository/interface/auth.repository.interface";
import type { AuthUseCaseInterface } from "./interface/auth.use-case.interface";

export class AuthUseCase implements AuthUseCaseInterface {
  constructor(private repository: AuthRepositoryInterface) {}

  async login(credentials: LoginRequest): Promise<UserSuccessDTO> {
    await this.repository.fetchCSRFToken();
    await this.repository.login(credentials);
    const user = await this.repository.getUser();
    return user;
  }

  async logout(): Promise<AuthSuccessDTO> {
    return this.repository.logout();
  }

  async getUser(): Promise<UserSuccessDTO> {
    return this.repository.getUser();
  }
}
