export type AuthUser = {
  id: string;
  email: string | null;
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthFailure = "invalid-credentials" | "email-taken" | "weak-password" | "unknown";

export type AuthMutationOptions = {
  onFailure?: (failure: AuthFailure) => void;
};
