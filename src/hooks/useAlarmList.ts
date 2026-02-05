import { Alarm } from "@/src/types/alarm";
import * as React from "react";



export function useAlarmList(province: "hn" | "hb", search: string) {
  const [alarms, setAlarms] = React.useState<Alarm[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const PAGE_SIZE = 10;
  const DEFAULT_BASE_URL = "http://113.47.8.100:8000";
const isMounted = React.useRef(false);


  const fetchAlarms = async (pageNum = 1, reset = false) => {

    setLoading(true);

    try {
      let ts = new Date().getTime()
      const res = await fetch(
        `${DEFAULT_BASE_URL}/list_panji_alarms` +
          `?page=${pageNum}&page_size=${PAGE_SIZE}` +
          `&province=${province}&keyword=${encodeURIComponent(search)}&ts=${ts}`,{
           cache: 'no-store', // 🔹 强制 iOS 不读缓存
           mode: 'cors'
        }
      );

      const json = await res.json();
      const list: Alarm[] = json.result?.alarm_data || [];

      setAlarms((prev) => (reset ? list : [...prev, ...list]));
      setHasMore(json.has_more);
      setPage(pageNum);
    } finally {
      setLoading(false);
      if (reset) setRefreshing(false);
    }
  };

  React.useEffect(() => {
    // 1. 挂载时立即发一次，不要等 500ms 防抖
    fetchAlarms(1, true);
    isMounted.current = true;
  }, []); // 仅执行一次



  // 搜索 / 省份变化
  React.useEffect(() => {
    if (!isMounted.current) return;
    const t = setTimeout(() => {
      setPage(1);
      setHasMore(true);
      fetchAlarms(1, true);
    }, 500);
    return () => clearTimeout(t);
  }, [province, search]);

  const loadMore = () => {
    if (!loading && hasMore && alarms.length > 0) {
      fetchAlarms(page + 1);
    }
  };

  const refresh = () => {
    setRefreshing(true);
    setHasMore(true);
    fetchAlarms(1, true);
  };

  return {
    alarms,
    loading,
    refreshing,
    hasMore,
    loadMore,
    refresh,
  };
}
