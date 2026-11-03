import { EmptyState, Page } from "@components";
import { useTranslate } from "@translate";

export function WordListScreen() {
  const { t } = useTranslate();

  return (
    <Page title={t("words.title")} safeTop={false}>
      <EmptyState message={t("words.empty")} />
    </Page>
  );
}
