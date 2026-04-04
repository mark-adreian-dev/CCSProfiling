import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TOASTER_CONFIG } from "../config/toaster.config";
import { handleError } from "../helpers/errorHandler";
import { AffiliationRepository } from "../infrastructure/repository/affiliation.repository";
import { AffiliationUseCase } from "../application/affiliation.use-case";
import type { AffiliationRequest } from "../domain/schema/affiliation.schema";

const repository = new AffiliationRepository();
const useCase = new AffiliationUseCase(repository);

export const useGetAffiliationByIdQuery = (affiliationId?: number) => {
  return useQuery({
    queryKey: ["affiliation", affiliationId],
    queryFn: () => useCase.getAffiliationData(affiliationId),
    enabled: !!affiliationId,
  });
};

export const useAddAffiliationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (affiliation: AffiliationRequest) => useCase.createAffiliationData(affiliation),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["affiliation"] });
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

export const useEditAffiliationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ affiliationId, affiliation }: { affiliationId: number; affiliation: AffiliationRequest }) =>
      useCase.editAffiliationData(affiliation, affiliationId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["affiliation", variables.affiliationId] });
      queryClient.invalidateQueries({ queryKey: ["affiliation"] });
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

export const useDeleteAffiliationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (affiliationId: number) => useCase.deleteAffiliationData(affiliationId),
    onSuccess: (data, affiliationId) => {
      queryClient.invalidateQueries({ queryKey: ["affiliation", affiliationId] });
      queryClient.invalidateQueries({ queryKey: ["affiliation"] });
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
