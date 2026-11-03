import { create } from "zustand";

import { type AuthState } from "./auth-type";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  saveUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  return { user, isLoading };
}
