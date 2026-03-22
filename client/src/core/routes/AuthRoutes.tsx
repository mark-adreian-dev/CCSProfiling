import { Outlet, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../hooks/auth.hooks";
import { useEffect } from "react";
import { ROUTER_CONFIG } from "../config/router.config";
import { useAuthStore } from "../store/auth.store";
import LoadingSpinner from "../presentation/components/custom/Loader/LoadingSpinner";

export default function AuthRoutes() {
  const { data: user, isLoading } = useGetUserQuery();
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setUser(user);
      navigate(ROUTER_CONFIG.PROTECTED.DASHBOARD.URL);
    }
  }, [navigate, setUser, user]);

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner message="Verifying request" />
      </div>
    );

  return <Outlet />;
}
