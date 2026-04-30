import type { PaginationParams } from "../utils/types/pagination-params.types";
import type { InterestChartDataSuccessDTO, InterestSuccessDTO, PaginatedInterestResponseDTO } from "../infrastructure/dto/interest.dto";
import type { InterestRepositoryInterface } from "../infrastructure/repository/interface/interest.reposity.interface";
import type { InterestUseCaseInterface } from "./interface/interest.use-case.interface";
import type { InterestRequest } from "../domain/schema/interest.schema";
import type { Interest } from "../domain/entity/interest.entity";

export class InterestUseCase implements InterestUseCaseInterface {
  constructor(private repository: InterestRepositoryInterface) {}

  async getAllInterestData(params: PaginationParams<Interest>): Promise<PaginatedInterestResponseDTO> {
    return this.repository.getAllInterestData(params);
  }

  async getInterestData(interestId?: number): Promise<InterestSuccessDTO> {
    return this.repository.getInterestData(interestId);
  }

  async createInterestData(interest: InterestRequest): Promise<InterestSuccessDTO> {
    return this.repository.createInterestData(interest);
  }

  async editInterestData(interest: InterestRequest, interestId: number): Promise<InterestSuccessDTO> {
    return this.repository.editInterestData(interest, interestId);
  }

  async deleteInterestData(interestId: number): Promise<InterestSuccessDTO> {
    return this.repository.deleteInterestData(interestId);
  }

  async addUserInterest(interestId: number): Promise<InterestSuccessDTO> {
    return this.repository.addUserInterest(interestId);
  }

  async removeUserInterest(interestId: number): Promise<InterestSuccessDTO> {
    return this.repository.removeUserInterest(interestId);
  }

  async getInterestChartData(): Promise<InterestChartDataSuccessDTO> {
    return this.repository.getInterestChartData();
  }

  async downloadInterestReport(): Promise<Blob> {
    return this.repository.downloadInterestReport();
  }
}
