import { isAuthApiError, type User } from "@supabase/supabase-js";

import { type AuthFailure, type AuthUser } from "./auth-types";

const FAILURES: Partial<Record<string, AuthFailure>> = {
  invalid_credentials: "invalid-credentials",
  user_already_exists: "email-taken",
  email_exists: "email-taken",
  weak_password: "weak-password",
};

function toUser(user: User): AuthUser {
  return { id: user.id, email: user.email ?? null };
}

function toFailure(error: unknown): AuthFailure {
  if (isAuthApiError(error) && error.code) {
    return FAILURES[error.code] ?? "unknown";
  }

  return "unknown";
}

export const authAdapter = { toUser, toFailure };
