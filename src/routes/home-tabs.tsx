import {
  createMaterialTopTabNavigator,
  type MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";

import { SegmentedTabs } from "@components";
import { useAppSafeArea } from "@hooks";
import { FavoritesScreen, HistoryScreen, WordListScreen } from "@screens";
import { useTranslate } from "@translate";

import { type HomeTabsParamList } from "./navigation-type";

const Tab = createMaterialTopTabNavigator<HomeTabsParamList>();

function HomeTabBar({ state, descriptors, navigation }: MaterialTopTabBarProps) {
  const { top } = useAppSafeArea();
  const segments = state.routes.map((route) => ({
    key: route.key,
    label: descriptors[route.key]?.options.title ?? route.name,
  }));
  const activeKey = state.routes[state.index]?.key ?? "";

  function select(key: string) {
    const route = state.routes.find((item) => item.key === key);

    if (route) {
      navigation.navigate(route.name);
    }
  }

  return <SegmentedTabs segments={segments} activeKey={activeKey} onChange={select} topInset={top} />;
}

function renderTabBar(props: MaterialTopTabBarProps) {
  return <HomeTabBar {...props} />;
}

export function HomeTabs() {
  const { t } = useTranslate();

  return (
    <Tab.Navigator tabBar={renderTabBar}>
      <Tab.Screen name="WordList" component={WordListScreen} options={{ title: t("tabs.words") }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: t("tabs.history") }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: t("tabs.favorites") }} />
    </Tab.Navigator>
  );
}
