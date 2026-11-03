import { type AuthFailure } from "@domain";
import { type TranslationKeys } from "@translate";

type AuthFailureDisplay = {
  field: "email" | "password";
  message: TranslationKeys;
};

export const AUTH_FAILURES: Record<AuthFailure, AuthFailureDisplay> = {
  "invalid-credentials": { field: "password", message: "auth.failure.invalidCredentials" },
  "email-taken": { field: "email", message: "auth.failure.emailTaken" },
  "weak-password": { field: "password", message: "auth.failure.weakPassword" },
  unknown: { field: "password", message: "auth.failure.unknown" },
};
