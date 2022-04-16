/*
 * @Author: flh
 * @Date: 2022-04-15 23:14:13
 * @LastEditTime: 2022-04-15 23:39:57
 * @LastEditors: Please set LastEditors
 * @Description: 任务组
 * @FilePath: /jira/src/utils/epic.ts
 */
import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/epic";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

/**
 * 获取任务组列表
 * @param param
 * @returns
 */
export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  // param 为依赖项（param发生变化，useQuery重新调用）
  return useQuery<Epic[]>(["epics", param], () =>
    client("epics", { data: param })
  );
};

/**
 * 添加任务
 * @param queryKey
 * @returns
 */
export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

/**
 * 删除任务
 * @param querykey
 * @returns
 */
export const useDeleteEpic = (querykey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(querykey)
  );
};
