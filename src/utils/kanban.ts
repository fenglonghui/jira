/*
 * @Author: flh
 * @Date: 2022-04-13 10:52:27
 * @LastEditTime: 2022-04-14 16:58:03
 * @LastEditors: Please set LastEditors
 * @Description: 关于看板 hook
 * @FilePath: /jira/src/utils/kanban.ts
 */

import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

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
