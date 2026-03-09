import type { LoginRequest } from "../domain/schema/auth.schema";
import type { AuthSuccessDTO } from "../infrastructure/dto/auth.dto";
import type { AuthRepositoryInterface } from "../infrastructure/repository/interface/auth.repository.interface";

export class AuthUseCase {
  constructor(private repository: AuthRepositoryInterface) {}

  async login(credentials: LoginRequest): Promise<AuthSuccessDTO> {
    await this.repository.login(credentials);
    return await this.repository.getUser()
  }

  async logout(): Promise<AuthSuccessDTO> {
    return this.repository.logout();
  }

  async fetchCSRFToken(): Promise<boolean> {
    return this.repository.fetchCSRFToken();
  }

  async getUser(): Promise<AuthSuccessDTO> {
    return this.repository.getUser();
  }
}
