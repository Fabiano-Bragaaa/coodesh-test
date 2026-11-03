import { translate } from "./translate";

export function useTranslate() {
  return { t: translate };
}
