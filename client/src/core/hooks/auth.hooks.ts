import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthUseCase } from "../application/auth.use-case";
import { AuthRepository } from "../infrastructure/repository/auth.repository";
import type { LoginRequest } from "../domain/schema/auth.schema";
import { handleError } from "../helpers/errorHandler";
import { TOASTER_CONFIG } from "../config/toaster.config";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import { ROUTER_CONFIG } from "../config/router.config";
import { Role } from "../enums/roles.enums";

const repository = new AuthRepository();
const useCase = new AuthUseCase(repository);

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setLoginStatus = useAuthStore((state) => state.setLoginStatus);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (credentials: LoginRequest) => useCase.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth-user"], data);
      setUser(data.data);
      setLoginStatus(true);

      const role = data.data.role;

      if (role !== Role.STUDENT) {
        navigate(ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.ADMIN.STUDENTS.URL);
      } else {
        navigate(ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.STUDENT.PROFILE.URL);
      }
    },
    onError: (error: unknown) => {
      handleError(error, TOASTER_CONFIG.AUTH);
    },
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((state) => state.clearUser);
  const clearCookies = useAuthStore((state) => state.clearCookies);

  return useMutation({
    mutationFn: () => useCase.logout(),
    onSuccess: () => {
      clearUser(); // Reset Zustand
      clearCookies(); // Reset Browser Cookies
      queryClient.clear(); // RESET EVERYTHING in TanStack Query
      navigate(ROUTER_CONFIG.AUTH.URL);
    },
    onError: (error) => {
      handleError(error, TOASTER_CONFIG.AUTH);
      // Even if the logout API fails, we usually want to clear the local session
      clearUser();
      queryClient.clear();
      navigate(ROUTER_CONFIG.AUTH.URL);
    },
  });
};

export const useGetUserQuery = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const clearUser = useAuthStore((state) => state.clearUser);

  return useQuery({
    queryKey: ["auth-user"],
    queryFn: () => useCase.getUser(),
    enabled: isLoggedIn,
    retry: false,
    select: (response) => response.data,
    meta: {
      errorMessage: "Session expired. Please login again.",
      onAuthError: () => {
        clearUser();
      },
    },
  });
};
