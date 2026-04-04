import { API_CONFIG } from "@/core/config/api.config";
import api from "@/core/utils/axios/axios-instance";
import { AffiliationSuccessDTOSchema, type AffiliationSuccessDTO } from "../dto/affiliation.dto";
import type { AffiliationRequest } from "@/core/domain/schema/affiliation.schema";

export class AffiliationRepository implements AffiliationRepository {
  async getAffiliationData(affiliationId?: number): Promise<AffiliationSuccessDTO> {
    const { data } = await api.get(`${API_CONFIG.endpoints.AFFILIATION}/${affiliationId}`);
    return AffiliationSuccessDTOSchema.parse(data);
  }

  async createAffiliationData(affiliation: AffiliationRequest): Promise<AffiliationSuccessDTO> {
    const { data } = await api.post(API_CONFIG.endpoints.AFFILIATION, affiliation);
    return AffiliationSuccessDTOSchema.parse(data);
  }

  async editAffiliationData(affiliation: AffiliationRequest, affiliationId: number): Promise<AffiliationSuccessDTO> {
    const { data } = await api.patch(`${API_CONFIG.endpoints.AFFILIATION}/${affiliationId}`, affiliation);
    return AffiliationSuccessDTOSchema.parse(data);
  }

  async deleteAffiliationData(affiliationId: number): Promise<AffiliationSuccessDTO> {
    const { data } = await api.delete(`${API_CONFIG.endpoints.AFFILIATION}/${affiliationId}`);
    return AffiliationSuccessDTOSchema.parse(data);
  }
}
