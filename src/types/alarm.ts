export type Alarm = {
  alarm_target: string;
  alarm_level: string;
  alarm_type: string;
  latest_alarm_time: string | number;
  alarm_status: string;
  metric_name: string;
  alarm_partition?: string;
  alarm_cluster: string;
  counter: number;
  mount_point: string;
  raw_alarm: string;
};