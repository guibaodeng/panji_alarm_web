import * as React from "react";
import { StatusBar, useColorScheme, View } from "react-native";
import {
  MD2DarkTheme,
  MD2LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function PaperThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorScheme = useColorScheme();

  const insets = useSafeAreaInsets();

  const theme = React.useMemo(
    () => (colorScheme === "dark" ? MD2DarkTheme : MD2LightTheme),
    [colorScheme],
  );

  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: colorScheme == "dark" ? "black" : "white",
          // backgroundColor: theme.colors.background,
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
  // return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
