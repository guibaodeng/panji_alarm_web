import { AppConfig } from "@/src/types/appconfig";
import { useEffect, useState } from "react";

export function useAppConfig() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadConfig = async () => {
      try {
        // 使用相对路径，确保在 Web 和 PWA 环境下正常
        const response = await fetch(`config.json?t=${Date.now()}`);
        if (!response.ok) throw new Error("无法加载配置文件");
        const data = await response.json();
        setConfig(data);
      } catch (e) {
        console.error("配置加载失败:", e);
        setError(e instanceof Error ? e.message : "未知错误");
      }finally{
        setIsLoaded(true)
      }
    };
    loadConfig();
  }, []);

  return { config, error, isReady: !!config, isLoaded };
}