import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import { UserRepository } from "../infrastructure/repository/user.repository";
import { UserUserCase } from "../application/user.use-case";
import type { PaginationParams } from "../utils/types/pagination-params.types";
import type { User } from "../domain/entity/user.entity";
import type { FacultyRequest } from "../domain/schema/faculty.schema";
import { toast } from "sonner";
import { handleError } from "../helpers/errorHandler";
import { TOASTER_CONFIG } from "../config/toaster.config";

const repository = new UserRepository();
const useCase = new UserUserCase(repository);

export const useGetFacultyProfilesQuery = ({ params }: { params: PaginationParams<User> }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return useQuery({
    queryKey: ["faculties", params],
    queryFn: () => useCase.getAllFacultyProfile(params),
    enabled: isLoggedIn,
  });
};

export const useGetFacultyByIdQuery = (id?: number) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return useQuery({
    queryKey: ["faculties", id],
    queryFn: () => useCase.getFacultyProfileByID(id!),
    enabled: isLoggedIn && !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAddFacultyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (facultyData: FacultyRequest) => useCase.addFaculty(facultyData),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["faculties"] });
      toast.success(data.message, {
        id: TOASTER_CONFIG.GLOBAL,
      });
    },

    onError: (error: unknown) => {
      handleError(error, TOASTER_CONFIG.GLOBAL);
    },
  });
};

export const useEditFacultyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ facultyData, facultyId }: { facultyData: FacultyRequest; facultyId: number }) => useCase.editFaculty(facultyData, facultyId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["faculties"] });
      toast.success(data.message, {
        id: TOASTER_CONFIG.GLOBAL,
      });
    },

    onError: (error: unknown) => {
      handleError(error, TOASTER_CONFIG.GLOBAL);
    },
  });
};
