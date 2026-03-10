import { Navigate, Outlet } from "react-router-dom";
import { ROUTER_CONFIG } from "../config/router.config";
import { useAuthStore } from "../store/auth.store";

export default function ProtectedRoutes() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  // No useGetUserQuery here! It's already handled by AuthGuard.
  
  if (!isLoggedIn) {
    return <Navigate to={ROUTER_CONFIG.AUTH.URL} replace />;
  }

  return <Outlet />;
}