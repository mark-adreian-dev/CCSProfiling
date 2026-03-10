import { useEffect } from "react";
import { useGetUserQuery } from "../hooks/auth.hooks";
import SpinnerLoader from "../presentation/components/custom/Loader/LoadingSpinner";
import { useAuthStore } from "../store/auth.store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  // We only run this if the store says we are logged in (e.g. from localStorage)
  const { data, isError, isLoading } = useGetUserQuery();

  useEffect(() => {
    if (data) setUser(data);
    if (isError) clearUser();
  }, [data, isError, setUser, clearUser]);

  // 1. Wait for Zustand to read localStorage
  if (!hasHydrated) return null;

  // 2. If we think we're logged in, wait for the API to confirm before showing the app
  if (isLoggedIn && isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <SpinnerLoader message="Verifying session..." />
      </div>
    );
  }

  return <>{children}</>;
}
