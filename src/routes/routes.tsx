import { NavigationContainer } from "@react-navigation/native";

import { AppStack } from "./app-stack";
import { navigationTheme } from "./navigation-theme";

export function Routes() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AppStack />
    </NavigationContainer>
  );
}
