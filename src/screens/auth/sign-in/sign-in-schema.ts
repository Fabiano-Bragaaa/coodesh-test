import { z } from "zod";

import { translate } from "@translate";

export const signInSchema = z.object({
  email: z.email(translate("form.emailInvalid")),
  password: z.string().min(1, translate("form.passwordRequired")),
});

export type SignInSchema = z.infer<typeof signInSchema>;
