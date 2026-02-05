import { AlarmItem } from "@/src/components/AlarmItem";
import { Alarm } from "@/src/types/alarm";
import * as React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { ActivityIndicator, Chip, Searchbar, Text } from "react-native-paper";

export function AlarmList({
  data,
  loading,
  refreshing,
  hasMore,
  search,
  onSearch,
  onLoadMore,
  onRefresh,
  onSelect,
}: {
  data: Alarm[];
  loading: boolean;
  refreshing: boolean;
  hasMore: boolean;
  search: string;
  onSearch: (s: string) => void;
  onLoadMore: () => void;
  onRefresh: () => void;
  onSelect: (a: Alarm) => void;
}) {
  return (
    <FlatList
      data={data}
      keyExtractor={(_, i) => i.toString()}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={
        <Searchbar
          placeholder="搜索告警"
          value={search}
          onChangeText={onSearch}
          style={{ margin: 8, borderRadius: 12 }}
        />
      }
      renderItem={({ item }) => (
        <AlarmItem item={item} onPress={() => onSelect(item)} />
      )}
      ListFooterComponent={
        <View style={{ padding: 16, alignItems: "center" }}>
          {loading ? (
            <ActivityIndicator />
          ) : hasMore ? (
            <Chip icon="chevron-down" onPress={onLoadMore}>
              点击加载更多
            </Chip>
          ) : (
            <Text>没有更多告警了</Text>
          )}
        </View>
      }
    />
  );
}
