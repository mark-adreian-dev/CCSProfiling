import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { ROUTER_CONFIG } from "../config/router.config";

const AuthRoutes = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? (
    <Navigate to={ROUTER_CONFIG.PROTECTED.DASHBOARD.URL} replace />
  ) : (
    <Outlet />
  );
};

export default AuthRoutes;
