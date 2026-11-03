import { i18n } from "./i18n";
import { type TranslationKeys } from "./translations.types";

type TranslateParams = Record<string, string | number>;

export function translate(key: TranslationKeys, params?: TranslateParams): string {
  return i18n.t(key, params);
}
