/*
 * @Author: flh
 * @Date: 2022-04-13 10:52:27
 * @LastEditTime: 2022-04-15 23:03:12
 * @LastEditors: Please set LastEditors
 * @Description: 关于看板 hook
 * @FilePath: /jira/src/utils/kanban.ts
 */

import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderKanbanConfig,
} from "./use-optimistic-options";

/**
 * 获取看板列表
 * @param param
 * @returns
 */
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  // param 为依赖项（param发生变化，useQuery重新调用）
  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};

/**
 * 添加kanabn
 * @param queryKey
 * @returns
 */
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

/**
 * 删除看板
 * @param querykey
 * @returns
 */
export const useDeleteKanban = (querykey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(querykey)
  );
};

export interface SortProps {
  // 重新排序的 item
  fromId: number;
  // 目标 item
  referenceId: number;
  // 放在目标item的前还是后
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}

/**
 * 看板排序
 * @param queryKey
 * @returns
 */
export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", {
      method: "POST",
      data: params,
    });
  }, useReorderKanbanConfig(queryKey));
};
