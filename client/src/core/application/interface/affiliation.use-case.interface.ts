import type { AffiliationRequest } from "@/core/domain/schema/affiliation.schema";
import type { AffiliationSuccessDTO } from "@/core/infrastructure/dto/affiliation.dto";

export interface AffiliationUseCaseInterface {
  getAffiliationData(interestId: number): Promise<AffiliationSuccessDTO>;

  createAffiliationData(interest: AffiliationRequest): Promise<AffiliationSuccessDTO>;

  editAffiliationData(interest: AffiliationRequest, interestId: number): Promise<AffiliationSuccessDTO>;

  deleteAffiliationData(interestId: number): Promise<AffiliationSuccessDTO>;
}
