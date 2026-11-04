import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { authService } from "@domain";
import { useAuthStore } from "@services";

export function useAuthStartup() {
  const queryClient = useQueryClient();

  useEffect(() => {
    return authService.onUserChange((user) => {
      const { user: previous, saveUser, removeUser } = useAuthStore.getState();

      if (user) {
        saveUser(user);
        return;
      }

      removeUser();

      if (previous) {
        queryClient.removeQueries({ predicate: (query) => query.queryKey.includes(previous.id) });
      }
    });
  }, [queryClient]);

  useEffect(() => {
    async function restore() {
      const { saveUser, setLoading } = useAuthStore.getState();

      try {
        const user = await authService.getUser();

        if (user) {
          saveUser(user);
        }
      } finally {
        setLoading(false);
      }
    }

    restore();
  }, []);
}
