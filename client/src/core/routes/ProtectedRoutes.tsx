import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { ROUTER_CONFIG } from "../config/router.config";

const ProtectedRoutes = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  console.log("isLoggedIn", isLoggedIn)
  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTER_CONFIG.AUTH.URL} />;
};

export default ProtectedRoutes;
