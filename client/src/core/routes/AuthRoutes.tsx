import { Navigate, Outlet } from "react-router-dom";
import { ROUTER_CONFIG } from "../config/router.config";
import { useAuthStore } from "../store/auth.store";

export default function AuthRoutes() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={ROUTER_CONFIG.PROTECTED.DASHBOARD.URL} replace />;
  }

  return <Outlet />;
}
