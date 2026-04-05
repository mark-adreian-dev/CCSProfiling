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
    // Wrap parameters in an object to pass both the data and the userId
    mutationFn: ({ affiliation }: { userId: number; affiliation: AffiliationRequest }) => useCase.createAffiliationData(affiliation),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["affiliation", variables.affiliation] });
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      queryClient.invalidateQueries({ queryKey: ["faculties", variables.userId] });
      queryClient.invalidateQueries({ queryKey: ["students", variables.userId] });

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
    mutationFn: ({ affiliationId, affiliation }: { userId: number; affiliationId: number; affiliation: AffiliationRequest }) =>
      useCase.editAffiliationData(affiliation, affiliationId),

    onSuccess: (data, variables) => {
      // Invalidate specific affiliation and the user's affiliation list
      queryClient.invalidateQueries({ queryKey: ["affiliation", variables.affiliationId] });
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      queryClient.invalidateQueries({ queryKey: ["faculties", variables.userId] });
      queryClient.invalidateQueries({ queryKey: ["students", variables.userId] });

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
    mutationFn: ({ affiliationId }: { userId: number; affiliationId: number }) => useCase.deleteAffiliationData(affiliationId),

    onSuccess: (data, variables) => {
      // Clean up the user-specific cache
      queryClient.invalidateQueries({ queryKey: ["affiliation", variables.affiliationId] });
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      queryClient.invalidateQueries({ queryKey: ["faculties", variables.userId] });
      queryClient.invalidateQueries({ queryKey: ["students", variables.userId] });

      toast.success(data.message, {
        id: TOASTER_CONFIG.GLOBAL,
      });
    },
    onError: (error: unknown) => {
      handleError(error, TOASTER_CONFIG.GLOBAL);
    },
  });
};