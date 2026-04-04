import type { AffiliationRequest } from "@/core/domain/schema/affiliation.schema";
import type { AffiliationSuccessDTO } from "../../dto/affiliation.dto";
import type {} from "../../dto/interest.dto";

export interface AffiliationRepositoryInterface {
  getAffiliationData(interestId?: number): Promise<AffiliationSuccessDTO>;

  createAffiliationData(interest: AffiliationRequest): Promise<AffiliationSuccessDTO>;

  editAffiliationData(interest: AffiliationRequest, interestId: number): Promise<AffiliationSuccessDTO>;

  deleteAffiliationData(interestId: number): Promise<AffiliationSuccessDTO>;
}
