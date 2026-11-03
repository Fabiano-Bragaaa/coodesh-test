import { useAppMutation } from "@infra";

import { authService } from "../auth-service";
import { type AuthCredentials, type AuthMutationOptions, type AuthUser } from "../auth-types";

export function useSignIn(options?: AuthMutationOptions) {
  return useAppMutation<AuthUser, AuthCredentials>({
    mutationFn: authService.signIn,
    onError: (error) => options?.onFailure?.(authService.toFailure(error)),
  });
}
