import { type NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type HomeTabsParamList = {
  WordList: undefined;
  History: undefined;
  Favorites: undefined;
};

export type AppStackParamList = {
  Home: NavigatorScreenParams<HomeTabsParamList>;
  Word: { word: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList, AppStackParamList, HomeTabsParamList {}
  }
}
