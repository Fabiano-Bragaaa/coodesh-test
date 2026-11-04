import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

import { Button, FormPasswordInput, FormTextInput, Page, Text } from "@components";
import { PASSWORD_MIN_LENGTH } from "@domain";
import { useTranslate } from "@translate";

import { useSignUpForm } from "./hooks/use-sign-up-form";

export function SignUpScreen() {
  const { t } = useTranslate();
  const navigation = useNavigation();
  const form = useSignUpForm();

  return (
    <Page scroll className="justify-center gap-8">
      <View className="gap-2">
        <Text variant="title-xl">{t("signUp.title")}</Text>
        <Text className="text-text-muted">{t("signUp.subtitle")}</Text>
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
          placeholder={t("auth.newPasswordPlaceholder", { min: PASSWORD_MIN_LENGTH })}
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="go"
          onSubmitEditing={form.submit}
        />
      </View>
      <View className="gap-3">
        <Button
          title={t("signUp.submit")}
          disabled={!form.canSubmit}
          isLoading={form.isLoading}
          onPress={form.submit}
        />
        <Button title={t("signUp.haveAccount")} variant="ghost" onPress={navigation.goBack} />
      </View>
    </Page>
  );
}
