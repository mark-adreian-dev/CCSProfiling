import type { PaginationParams } from "@/core/utils/types/pagination-params.types";
import type { Interest } from "@/core/domain/entity/interest.entity";
import type { InterestChartDataSuccessDTO, InterestSuccessDTO, PaginatedInterestResponseDTO } from "../../dto/interest.dto";
import type { InterestRequest } from "@/core/domain/schema/interest.schema";

export interface InterestRepositoryInterface {
  getAllInterestData(params: PaginationParams<Interest>): Promise<PaginatedInterestResponseDTO>;

  getInterestData(interestId?: number): Promise<InterestSuccessDTO>;

  createInterestData(interest: InterestRequest): Promise<InterestSuccessDTO>;

  editInterestData(interest: InterestRequest, interestId: number): Promise<InterestSuccessDTO>;

  deleteInterestData(interestId: number): Promise<InterestSuccessDTO>;

  addUserInterest(interestId: number): Promise<InterestSuccessDTO>;

  removeUserInterest(interestId: number): Promise<InterestSuccessDTO>;

  getInterestChartData(): Promise<InterestChartDataSuccessDTO>;

  downloadInterestReport(): Promise<Blob>;
}
