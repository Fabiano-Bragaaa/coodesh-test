import { z } from "zod";

import { PASSWORD_MIN_LENGTH } from "@domain";
import { translate } from "@translate";

export const signUpSchema = z.object({
  email: z.email(translate("form.emailInvalid")),
  password: z.string().min(PASSWORD_MIN_LENGTH, translate("form.passwordTooShort", { min: PASSWORD_MIN_LENGTH })),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
