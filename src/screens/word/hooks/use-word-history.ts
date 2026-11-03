import { useEffect } from "react";

import { useRecordView } from "@domain";
import { useAuth } from "@services";

export function useWordHistory(word: string) {
  const { user } = useAuth();
  const { mutate: recordView } = useRecordView(user?.id);

  useEffect(() => {
    recordView(word);
  }, [recordView, word]);
}
