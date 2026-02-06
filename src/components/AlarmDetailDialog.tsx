import { Alarm } from "@/src/types/alarm";
import * as React from "react";
import { Dialog, Portal, Text } from "react-native-paper";

export function AlarmDetailDialog({
  alarm,
  onClose,
}: {
  alarm: Alarm | null;
  onClose: () => void;
}) {
  return (
    <Portal>
      <Dialog
        visible={!!alarm}
        onDismiss={onClose}
        style={{ borderRadius: 20 }}
      >
        <Dialog.Title>告警详情</Dialog.Title>
        <Dialog.Content>
          {alarm && (
            <Text>
              {alarm.raw_alarm
                .replace("-告警目标", "\n告警目标")
                .replace("【磐基 PaaS 平台】", "")
                // .replace(/【[^【]*$/, "")
                .trim()}
            </Text>
          )}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
