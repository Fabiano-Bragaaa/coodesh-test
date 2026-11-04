import { useQueryClient } from "@tanstack/react-query";

import { useAppMutation } from "@infra";
import { useAuth, useAuthService } from "@services";

import { authService } from "../auth-service";

export function useSignOut() {
  const { user } = useAuth();
  const { removeUser } = useAuthService();
  const queryClient = useQueryClient();

  function forgetUser() {
    const userId = user?.id;

    removeUser();

    if (userId) {
      queryClient.removeQueries({ predicate: (query) => query.queryKey.includes(userId) });
    }
  }

  return useAppMutation<void>({
    mutationFn: authService.signOut,
    onMutate: forgetUser,
  });
}
