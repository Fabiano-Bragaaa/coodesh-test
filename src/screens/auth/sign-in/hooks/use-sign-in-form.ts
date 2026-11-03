import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type AuthFailure, useSignIn } from "@domain";
import { useTranslate } from "@translate";

import { AUTH_FAILURES } from "../../auth-failures";
import { signInSchema, type SignInSchema } from "../sign-in-schema";

const defaultValues: SignInSchema = { email: "", password: "" };

export function useSignInForm() {
  const { t } = useTranslate();
  const { control, formState, handleSubmit, setError } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues,
    mode: "onChange",
  });
  const signIn = useSignIn({ onFailure: showFailure });

  function showFailure(failure: AuthFailure) {
    const { field, message } = AUTH_FAILURES[failure];

    setError(field, { message: t(message) });
  }

  function sendCredentials(values: SignInSchema) {
    signIn.mutate(values);
  }

  function submit() {
    handleSubmit(sendCredentials)();
  }

  return { control, canSubmit: formState.isValid, isLoading: signIn.isLoading, submit };
}
