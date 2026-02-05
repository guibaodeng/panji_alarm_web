import { AlarmScreen } from "@/src/screens/AlarmScreen";
import { useLocalSearchParams } from "expo-router";

export default function ProvincePage() {
  // 获取 URL 中的参数，例如访问 /hn 时，province 就是 "hn"
  const { province } = useLocalSearchParams<{ province: string }>();

  // 兜底逻辑：如果参数不对，可以默认显示湖南
  const displayProvince = province === "hb" ? "hb" : "hn";

  return <AlarmScreen defaultProvince={displayProvince} />;
}
