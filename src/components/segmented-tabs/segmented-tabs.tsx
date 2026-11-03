import { Pressable, View } from "react-native";

import { Text } from "../text/text";
import { segmentStyle } from "./segmented-tabs-preset";

export type Segment = {
  key: string;
  label: string;
};

type SegmentedTabsProps = {
  segments: Segment[];
  activeKey: string;
  onChange: (key: string) => void;
  topInset: number;
};

export function SegmentedTabs({ segments, activeKey, onChange, topInset }: SegmentedTabsProps) {
  return (
    <View className="bg-background px-4 pb-2" style={{ paddingTop: topInset }}>
      <View className="flex-row overflow-hidden rounded-md border border-border">
        {segments.map((segment, index) => {
          const active = segment.key === activeKey;
          const style = segmentStyle({ active, divided: index > 0 });

          return (
            <Pressable
              key={segment.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              onPress={() => onChange(segment.key)}
              className={style.container()}>
              <Text className={style.label()}>{segment.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
