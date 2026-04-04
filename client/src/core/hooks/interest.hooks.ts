import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { InterestRepository } from "../infrastructure/repository/interest.repository";
import { InterestUseCase } from "../application/interest.use-case";
import type { Interest } from "../domain/entity/interest.entity";
import type { PaginationParams } from "../utils/types/pagination-params.types";
import type { InterestRequest } from "../domain/schema/interest.schema";
import { toast } from "sonner";
import { TOASTER_CONFIG } from "../config/toaster.config";
import { handleError } from "../helpers/errorHandler";

const repository = new InterestRepository();
const useCase = new InterestUseCase(repository);

export const useGetAllInterestQuery = ({ params }: { params: PaginationParams<Interest> }) => {
  return useQuery({
    queryKey: ["interest", params],
    queryFn: () => useCase.getAllInterestData(params),
  });
};

export const useGetInterestByIdQuery = (interestId?: number) => {
  return useQuery({
    queryKey: ["interest", interestId],
    queryFn: () => useCase.getInterestData(interestId),
    enabled: !!interestId,
  });
};

export const useAddInterestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (interest: InterestRequest) => useCase.createInterestData(interest),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["interest"] });
      toast.success(data.message, {
        id: TOASTER_CONFIG.GLOBAL,
      });
    },

    onError: (error: unknown) => {
      handleError(error, TOASTER_CONFIG.GLOBAL);
    },
  });
};

export const useEditInterestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ interestId, interest }: { interestId: number; interest: InterestRequest }) => useCase.editInterestData(interest, interestId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["interest", variables.interestId] });
      queryClient.invalidateQueries({ queryKey: ["interest"] });
      toast.success(data.message, {
        id: TOASTER_CONFIG.GLOBAL,
      });
    },

    onError: (error: unknown) => {
      handleError(error, TOASTER_CONFIG.GLOBAL);
    },
  });
};

export const useDeleteInterestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (interestId: number) => useCase.deleteInterestData(interestId),
    onSuccess: (data, interestId) => {
      queryClient.invalidateQueries({ queryKey: ["interest", interestId] });
      queryClient.invalidateQueries({ queryKey: ["interest"] });
      toast.success(data.message, {
        id: TOASTER_CONFIG.GLOBAL,
      });
    },

    onError: (error: unknown) => {
      handleError(error, TOASTER_CONFIG.GLOBAL);
    },
  });
};

export const useAddUserInterestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (interestId: number) => useCase.addUserInterest(interestId),
    onSuccess: (data, interestId) => {
      queryClient.invalidateQueries({ queryKey: ["interest", interestId] });
      queryClient.invalidateQueries({ queryKey: ["interest"] });
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      toast.success(data.message, {
        id: TOASTER_CONFIG.GLOBAL,
      });
    },

    onError: (error: unknown) => {
      handleError(error, TOASTER_CONFIG.GLOBAL);
    },
  });
};

export const useRemoveUserInterestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (interestId: number) => useCase.removeUserInterest(interestId),
    onSuccess: (data, interestId) => {
      queryClient.invalidateQueries({ queryKey: ["interest", interestId] });
      queryClient.invalidateQueries({ queryKey: ["interest"] });
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      toast.success(data.message, {
        id: TOASTER_CONFIG.GLOBAL,
      });
    },

    onError: (error: unknown) => {
      handleError(error, TOASTER_CONFIG.GLOBAL);
    },
  });
};
