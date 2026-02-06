import * as SystemUI from "expo-system-ui";
import * as React from "react";
import { StatusBar, useColorScheme, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BlueMateriaDarkTheme,
  BlueMateriaLightTheme,
} from "./BlueMateriaTheme";

export function PaperThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorScheme = useColorScheme();

  const insets = useSafeAreaInsets();

  const theme = React.useMemo(
    () =>
      colorScheme === "dark" ? BlueMateriaDarkTheme : BlueMateriaLightTheme,
    [colorScheme],
  );

  React.useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.colors.background);
  }, []);

  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          // backgroundColor: colorScheme == "dark" ? "black" : "white",
          backgroundColor: theme.colors.background,
        }}
      >
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
          backgroundColor={theme.colors.background}
        />
        {children}
      </View>
    </PaperProvider>
  );
}
