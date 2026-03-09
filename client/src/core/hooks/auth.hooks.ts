import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthUseCase } from "../application/auth.use-case";
import { AuthRepository } from "../infrastructure/repository/auth.repository";
import type { LoginRequest } from "../domain/schema/auth.schema";
import { toast } from "sonner";
import type { AuthSuccessDTO } from "../infrastructure/dto/auth.dto";
import { handleError } from "../helpers/errorHandler";
import { TOASTER_CONFIG } from "../config/toaster.config";
import { useNavigate } from "react-router-dom";
import { ROUTER_CONFIG } from "../config/router.config";
import { useAuthStore } from "../store/auth.store";

const repository = new AuthRepository();
const useCase = new AuthUseCase(repository);

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Add this
  const setLoginStatus = useAuthStore((state) => state.setLoginStatus);
 
  return useMutation({
    mutationFn: (credentials: LoginRequest) => useCase.login(credentials),
    onSuccess: (data: AuthSuccessDTO) => {
      navigate(ROUTER_CONFIG.PROTECTED.DASHBOARD.URL);
      setLoginStatus(true);
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      navigate(ROUTER_CONFIG.PROTECTED.DASHBOARD.URL);
      toast.success(data.message, {
        id: TOASTER_CONFIG.AUTH,
      });
    },
    onError: (error: unknown) => {
      handleError(error, TOASTER_CONFIG.AUTH);
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () => useCase.logout(),
    onError: (error: unknown) => {
      handleError(error, TOASTER_CONFIG.AUTH);
    },
  });
};

export const useCSRFTokenQuery = () => {
  return useQuery({
    queryKey: ["csrf-token"],
    queryFn: () => useCase.fetchCSRFToken(),
  });
};

export const useGetUserQuery = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return useQuery({
    queryKey: ["auth-user"],
    queryFn: () => useCase.getUser(),
    enabled: isLoggedIn,
  });
};
