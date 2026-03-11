import type { User } from "../domain/entity/user.entity";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStoreType = {
  user: User | null;
  isLoggedIn: boolean;
  hasHydrated: boolean; // UI flag to prevent routing before storage is read
  setUser: (user: User) => void;
  setLoginStatus: (status: boolean) => void;
  setHasHydrated: () => void;
  clearUser: () => void;
  clearCookies: () => void;
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      hasHydrated: false,
      setHasHydrated: () => {
        set({ hasHydrated: true });
      },
      setUser: (user: User) => {
        set({ user, isLoggedIn: true });
      },
      setLoginStatus: (status: boolean) => {
        set({ isLoggedIn: status });
      },
      clearUser: () => {
        set({ user: null, isLoggedIn: false });
      },
      clearCookies: () => {
        // Clear all cookies
        document.cookie.split(";").forEach((cookie) => {
          const name = cookie.split("=")[0].trim();
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
      },
    }),
    {
      name: "auth-storage",
      // Only persist isLoggedIn.
      // We do NOT persist 'user' (security) or 'hasHydrated' (logic).
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
      }),
      onRehydrateStorage: () => (state) => {
        // This marks the store as ready once localStorage is read
        state?.setHasHydrated();
      },
    }
  )
);
