import ptBr from "./pt-br.json";

type PluralForm = "zero" | "one" | "two" | "few" | "many" | "other";

type PathKeys<T, P extends string = ""> = {
  [K in keyof T & string]: T[K] extends object
    ? keyof T[K] extends PluralForm
      ? `${P}${K}`
      : PathKeys<T[K], `${P}${K}.`>
    : `${P}${K}`;
}[keyof T & string];

export type TranslationKeys = PathKeys<typeof ptBr>;
