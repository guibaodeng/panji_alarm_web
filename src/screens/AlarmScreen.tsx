import { AlarmAppBar } from "@/src/components/AlarmAppBar";
import { AlarmDetailDialog } from "@/src/components/AlarmDetailDialog";
import { AlarmList } from "@/src/components/AlarmList";
import { useAlarmList } from "@/src/hooks/useAlarmList";
import { Alarm } from "@/src/types/alarm";
import * as React from "react";
import { View, useColorScheme } from "react-native";

export function AlarmScreen({
  defaultProvince = "hn",
}: {
  defaultProvince?: "hn" | "hb";
}) {
  const [province, setProvince] = React.useState<"hn" | "hb">(defaultProvince);

  const colorScheme = useColorScheme();

  const [search, setSearch] = React.useState("");
  const [current, setCurrent] = React.useState<Alarm | null>(null);

  const alarmList = useAlarmList(province, search);

  return (
    <>
      <View
        style={{
          flex: 1,
          overflow: "hidden",
          backgroundColor: colorScheme === "dark" ? "black" : "white",
        }}
      >
        <AlarmAppBar province={province} />
        <AlarmList
          // 🔹 属性名映射：把 Hook 的 alarms 传给组件的 data
          data={alarmList.alarms}
          loading={alarmList.loading}
          refreshing={alarmList.refreshing}
          hasMore={alarmList.hasMore}
          // 🔹 属性名映射：把 Hook 的函数传给组件对应的 prop
          onLoadMore={alarmList.loadMore}
          onRefresh={alarmList.refresh}
          search={search}
          onSearch={setSearch}
          onSelect={setCurrent}
        />
        <AlarmDetailDialog alarm={current} onClose={() => setCurrent(null)} />
      </View>
    </>
  );
}
