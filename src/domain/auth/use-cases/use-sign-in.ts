import { useAppMutation } from "@infra";
import { useAuthService } from "@services";

import { authService } from "../auth-service";
import { type AuthCredentials, type AuthMutationOptions, type AuthUser } from "../auth-types";

export function useSignIn(options?: AuthMutationOptions) {
  const { saveUser } = useAuthService();

  function showFailure(error: Error) {
    options?.onFailure?.(authService.toFailure(error));
  }

  return useAppMutation<AuthUser, AuthCredentials>({
    mutationFn: authService.signIn,
    onSuccess: saveUser,
    onError: showFailure,
  });
}
