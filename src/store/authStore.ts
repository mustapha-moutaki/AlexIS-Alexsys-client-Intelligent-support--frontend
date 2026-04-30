import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/User";
import { AuthState } from "../types/AuthState";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: (user: User, token: string) => {
        set({ user, token });
      },

      clearAuth: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);

export default useAuthStore;