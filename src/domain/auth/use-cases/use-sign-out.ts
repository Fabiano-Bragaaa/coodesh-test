import { useAppMutation } from "@infra";

import { authService } from "../auth-service";

export function useSignOut() {
  return useAppMutation<void>({
    mutationFn: authService.signOut,
  });
}
