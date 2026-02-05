import { Alarm } from "@/src/types/alarm";
import * as React from "react";
import { Chip, List } from "react-native-paper";

const levelColor = (level: string) => {
  if (level.includes("严重")) return "#D32F2F";
  if (level.includes("中度")) return "#FFA000";
  return "#616161";
};

export function AlarmItem({
  item,
  onPress,
}: {
  item: Alarm;
  onPress: () => void;
}) {
  return (
    <List.Item
      title={item.metric_name}
      description={`${item.alarm_cluster}\n${item.alarm_target}\n${item.latest_alarm_time}`}
      descriptionNumberOfLines={0}
      right={() => (
        <Chip
          compact
          style={{
            alignSelf: "center",
            backgroundColor: levelColor(item.alarm_level),
          }}
          textStyle={{ color: "white" }}
        >
          {item.alarm_level}
        </Chip>
      )}
      onPress={onPress}
    />
  );
}
