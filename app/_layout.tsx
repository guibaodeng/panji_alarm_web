import { PaperThemeProvider } from "@/src/theme/PaperThemeProvider";
import { Stack } from "expo-router";
import Head from "expo-router/head";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
export default function RootLayout() {
  // 注册 Service Worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((reg) => console.log("SW registered", reg))
          .catch((err) => console.log("SW registration failed", err));
      });
    }
  }, []);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <PaperThemeProvider>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
    html, body, #root, [data-contents="true"] {
      height: 100% !important;
      margin: 0;
      padding: 0;
      background-color: ${isDark ? "#121212" : "#ffffff"} !important;
    }
    /* 针对 iOS 橡皮筋回弹效果的背景色锁定 */
    body {
      position: fixed;
      overflow: hidden;
      width: 100%;
    }
  `,
          }}
        />
        <meta name="theme-color" content={isDark ? "#1a1a1a" : "#ffffff"} />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content={isDark ? "black-translucent" : "default"}
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        ></meta>
      </Head>

      <Stack
        screenOptions={{
          headerShown: false, // 隐藏顶部标题
        }}
      />
    </PaperThemeProvider>
  );
}

// export default function RootLayout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false, // 隐藏顶部标题
//       }}
//     />
//   );
// }
