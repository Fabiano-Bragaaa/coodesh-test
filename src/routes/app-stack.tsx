import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { WordScreen } from "@screens";

import { HomeTabs } from "./home-tabs";
import { type AppStackParamList } from "./navigation-type";

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Word" component={WordScreen} />
    </Stack.Navigator>
  );
}
