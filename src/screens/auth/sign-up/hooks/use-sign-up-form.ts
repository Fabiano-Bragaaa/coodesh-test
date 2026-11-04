import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type AuthFailure, useSignUp } from "@domain";
import { useTranslate } from "@translate";

import { AUTH_FAILURES } from "../../auth-failures";
import { signUpSchema, type SignUpSchema } from "../sign-up-schema";

const defaultValues: SignUpSchema = { email: "", password: "" };

export function useSignUpForm() {
  const { t } = useTranslate();
  const { control, formState, handleSubmit, setError } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
    mode: "onChange",
  });
  const signUp = useSignUp({ onFailure: showFailure });

  function showFailure(failure: AuthFailure) {
    const { field, message } = AUTH_FAILURES[failure];

    setError(field, { message: t(message) });
  }

  function sendCredentials(values: SignUpSchema) {
    signUp.mutate(values);
  }

  function submit() {
    handleSubmit(sendCredentials)();
  }

  return { control, canSubmit: formState.isValid, isLoading: signUp.isLoading, submit };
}
