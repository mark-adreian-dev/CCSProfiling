import { API_CONFIG } from "@/core/config/api.config";
import api from "@/core/utils/axios/axios-instance";
import type { PaginationParams } from "@/core/utils/types/pagination-params.types";
import {
  InterestChartDataSuccessDTOSchema,
  InterestSuccessDTOSchema,
  PaginatedInterestResponseDTOSchema,
  type InterestChartDataSuccessDTO,
  type InterestSuccessDTO,
  type PaginatedInterestResponseDTO,
} from "../dto/interest.dto";
import type { InterestRepositoryInterface } from "./interface/interest.reposity.interface";
import type { InterestRequest } from "@/core/domain/schema/interest.schema";

export class InterestRepository implements InterestRepositoryInterface {
  async getAllInterestData(params: PaginationParams<InterestRequest>): Promise<PaginatedInterestResponseDTO> {
    const { data } = await api.get(API_CONFIG.endpoints.INTEREST.BASE, { params });
    return PaginatedInterestResponseDTOSchema.parse(data);
  }

  async getInterestData(interestId?: number): Promise<InterestSuccessDTO> {
    const { data } = await api.get(`${API_CONFIG.endpoints.INTEREST.BASE}/${interestId}`);
    return InterestSuccessDTOSchema.parse(data);
  }

  async createInterestData(interest: InterestRequest): Promise<InterestSuccessDTO> {
    const { data } = await api.post(API_CONFIG.endpoints.INTEREST.BASE, interest);
    return InterestSuccessDTOSchema.parse(data);
  }

  async editInterestData(interest: InterestRequest, interestId: number): Promise<InterestSuccessDTO> {
    const { data } = await api.patch(`${API_CONFIG.endpoints.INTEREST}/${interestId}`, interest);
    return InterestSuccessDTOSchema.parse(data);
  }

  async deleteInterestData(interestId: number): Promise<InterestSuccessDTO> {
    const { data } = await api.delete(`${API_CONFIG.endpoints.INTEREST}/${interestId}`);
    return InterestSuccessDTOSchema.parse(data);
  }

  async addUserInterest(interestId: number): Promise<InterestSuccessDTO> {
    const payload = {
      interest_id: interestId,
    };
    const { data } = await api.post(`${API_CONFIG.endpoints.INTEREST.ADD_USER}`, payload);
    return InterestSuccessDTOSchema.parse(data);
  }

  async removeUserInterest(interestId: number): Promise<InterestSuccessDTO> {
    const payload = {
      interest_id: interestId,
    };
    const { data } = await api.post(`${API_CONFIG.endpoints.INTEREST.REMOVE_USER}`, payload);
    return InterestSuccessDTOSchema.parse(data);
  }

  async getInterestChartData(): Promise<InterestChartDataSuccessDTO> {
    const { data } = await api.get(`${API_CONFIG.endpoints.INTEREST.CHART_DATA}`);
    return InterestChartDataSuccessDTOSchema.parse(data);
  }

  async downloadInterestReport(): Promise<Blob> {
    const response = await api.get<Blob>(API_CONFIG.endpoints.INTEREST.REPORT, {
      responseType: "blob",
    });

    return response.data;
  }
}
