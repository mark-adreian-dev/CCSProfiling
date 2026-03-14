import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import { UserRepository } from "../infrastructure/repository/user.repository";
import { UserUserCase } from "../application/user.use-case";
import type { PaginationParams } from "../utils/types/pagination-params.types";
import type { User } from "../domain/entity/user.entity";

const repository = new UserRepository();
const useCase = new UserUserCase(repository);

export const useGetFacultyProfilesQuery = ({ params }: { params: PaginationParams<User> }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return useQuery({
    queryKey: ["faculty", params],
    queryFn: () => useCase.getAllFacultyProfile(params),
    enabled: isLoggedIn,
  });
};

export const useGetStudentProfilesQuery = ({ params }: { params: PaginationParams<User> }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return useQuery({
    queryKey: ["student", params],
    queryFn: () => useCase.getAllStudentProfile(params),
    enabled: isLoggedIn,
  });
};
