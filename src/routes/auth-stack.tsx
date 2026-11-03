import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignInScreen, SignUpScreen } from "@screens";

import { type AuthStackParamList } from "./navigation-type";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
