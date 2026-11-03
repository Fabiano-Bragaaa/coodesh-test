import { I18n } from "i18n-js";

import ptBr from "./pt-br.json";

export const i18n = new I18n({
  pt: ptBr,
});

i18n.defaultLocale = "pt";
i18n.enableFallback = true;
i18n.locale = "pt";
