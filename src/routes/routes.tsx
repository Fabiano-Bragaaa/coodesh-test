import { NavigationContainer } from "@react-navigation/native";

import { LoadingState } from "@components";
import { useAuth, useAuthStartup } from "@services";

import { AppStack } from "./app-stack";
import { AuthStack } from "./auth-stack";
import { navigationTheme } from "./navigation-theme";

export function Routes() {
  useAuthStartup();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>{user ? <AppStack /> : <AuthStack />}</NavigationContainer>
  );
}
