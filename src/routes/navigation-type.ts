import { type NavigatorScreenParams } from "@react-navigation/native";

export type HomeTabsParamList = {
  WordList: undefined;
  History: undefined;
  Favorites: undefined;
};

export type AppStackParamList = {
  Home: NavigatorScreenParams<HomeTabsParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList, HomeTabsParamList {}
  }
}
