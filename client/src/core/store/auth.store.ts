import type { User } from "../domain/entity/user.entity";
import { create } from "zustand";

type AuthStoreType = {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  setLoginStatus: (status: boolean) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthStoreType>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user: User) => {
    set({ user: user });
  },
  setLoginStatus: (status: boolean) => {
    set({ isLoggedIn: status });
  },
  clearUser: () => {
    set({ user: null, isLoggedIn: false });
  },
}));
