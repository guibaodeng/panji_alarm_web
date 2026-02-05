import { router } from "expo-router";
import * as React from "react";
import { Appbar, Menu, useTheme } from "react-native-paper";

export function AlarmAppBar({
  province,
}: {
  province: "hn" | "hb";
  // onChange: (p: "hn" | "hb") => void;
}) {
  const [visible, setVisible] = React.useState(false);

  const theme = useTheme();
  const handleSelect = (code: string) => {
    setVisible(false);
    // 🔹 关键：直接跳转到对应的动态路由路径
    router.push(`/${code}`);
  };

  return (
    <Appbar.Header>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Appbar.Action
            // color={theme.colors.onPrimary}
            // style={{
            //   backgroundColor: theme.colors.primary,
            // }}
            icon="menu"
            onPress={() => setVisible(true)}
          />
        }
      >
        <Menu.Item title="湖南" onPress={() => handleSelect("hn")} />
        <Menu.Item title="湖北" onPress={() => handleSelect("hb")} />
      </Menu>
      <Appbar.Content title={`告警 · ${province === "hn" ? "湖南" : "湖北"}`} />
    </Appbar.Header>
  );
}
