import { type AuthUser } from "@domain";

export type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
  saveUser: (user: AuthUser) => void;
  removeUser: () => void;
  setLoading: (value: boolean) => void;
};
