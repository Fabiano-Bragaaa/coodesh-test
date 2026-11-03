import { useAppMutation } from "@infra";

import { authService } from "../auth-service";
import { type AuthCredentials, type AuthMutationOptions, type AuthUser } from "../auth-types";

export function useSignUp(options?: AuthMutationOptions) {
  return useAppMutation<AuthUser, AuthCredentials>({
    mutationFn: authService.signUp,
    onError: (error) => options?.onFailure?.(authService.toFailure(error)),
  });
}
