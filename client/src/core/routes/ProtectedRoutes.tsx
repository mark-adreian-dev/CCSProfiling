import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ROUTER_CONFIG } from "../config/router.config";

import { useGetUserQuery } from "../hooks/auth.hooks";
import { Toaster } from "../presentation/components/base/ui/sonner";
import { TOASTER_CONFIG } from "../config/toaster.config";
import LoadingSpinner from "../presentation/components/custom/Loader/LoadingSpinner";
import { useAuthStore } from "../store/auth.store";

export default function ProtectedRoutes() {
  const { data: user, isLoading } = useGetUserQuery();
  const { setUser, clearUser, clearCookies, hasHydrated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasHydrated || isLoading) return;

    if (user) {
      setUser(user);
    } else {
      clearUser();
      clearCookies();
      navigate(ROUTER_CONFIG.AUTH.URL, { replace: true });
    }
  }, [user, isLoading, hasHydrated, setUser, clearUser, clearCookies, navigate]);

  if (isLoading || !hasHydrated) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner message="Verifying session..." />
      </div>
    );
  }
  return (
    <div>
      <Toaster
        richColors
        position="top-center"
        closeButton
        toastOptions={{
          closeButton: false,
          toasterId: TOASTER_CONFIG.GLOBAL,
        }}
      />

      <Outlet />
    </div>
  );
}
