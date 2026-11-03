import { EmptyState, Page } from "@components";
import { useTranslate } from "@translate";

export function FavoritesScreen() {
  const { t } = useTranslate();

  return (
    <Page title={t("favorites.title")} safeTop={false}>
      <EmptyState message={t("favorites.empty")} />
    </Page>
  );
}
