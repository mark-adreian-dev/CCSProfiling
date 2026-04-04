import type { AffiliationRequest } from "../domain/schema/affiliation.schema";
import type { AffiliationSuccessDTO } from "../infrastructure/dto/affiliation.dto";
import type { AffiliationRepositoryInterface } from "../infrastructure/repository/interface/affiliation.reposity.interface";
import type { AffiliationUseCaseInterface } from "./interface/affiliation.use-case.interface";

export class AffiliationUseCase implements AffiliationUseCaseInterface {
  constructor(private repository: AffiliationRepositoryInterface) {}

  async getAffiliationData(interestId?: number): Promise<AffiliationSuccessDTO> {
    return this.repository.getAffiliationData(interestId);
  }

  async createAffiliationData(interest: AffiliationRequest): Promise<AffiliationSuccessDTO> {
    return this.repository.createAffiliationData(interest);
  }

  async editAffiliationData(interest: AffiliationRequest, interestId: number): Promise<AffiliationSuccessDTO> {
    return this.repository.editAffiliationData(interest, interestId);
  }

  async deleteAffiliationData(interestId: number): Promise<AffiliationSuccessDTO> {
    return this.repository.deleteAffiliationData(interestId);
  }
}
