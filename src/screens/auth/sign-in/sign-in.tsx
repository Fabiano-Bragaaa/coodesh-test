import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

import { Button, FormPasswordInput, FormTextInput, Page, Text } from "@components";
import { useTranslate } from "@translate";

import { useSignInForm } from "./hooks/use-sign-in-form";

export function SignInScreen() {
  const { t } = useTranslate();
  const navigation = useNavigation();
  const form = useSignInForm();

  function openSignUp() {
    navigation.navigate("SignUp");
  }

  return (
    <Page scroll className="justify-center gap-8">
      <View className="gap-2">
        <Text variant="title-xl">{t("signIn.title")}</Text>
        <Text className="text-text-muted">{t("signIn.subtitle")}</Text>
      </View>
      <View className="gap-4">
        <FormTextInput
          control={form.control}
          name="email"
          label={t("auth.email")}
          placeholder={t("auth.emailPlaceholder")}
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
        />
        <FormPasswordInput
          control={form.control}
          name="password"
          label={t("auth.password")}
          placeholder={t("auth.passwordPlaceholder")}
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={form.submit}
        />
      </View>
      <View className="gap-3">
        <Button
          title={t("signIn.submit")}
          disabled={!form.canSubmit}
          isLoading={form.isLoading}
          onPress={form.submit}
        />
        <Button title={t("signIn.createAccount")} variant="outline" onPress={openSignUp} />
      </View>
    </Page>
  );
}
