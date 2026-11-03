import { EmptyState, Page } from "@components";
import { useTranslate } from "@translate";

export function HistoryScreen() {
  const { t } = useTranslate();

  return (
    <Page title={t("history.title")} safeTop={false}>
      <EmptyState message={t("history.empty")} />
    </Page>
  );
}
