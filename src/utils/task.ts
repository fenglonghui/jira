/*
 * @Author: flh
 * @Date: 2022-04-13 10:59:12
 * @LastEditTime: 2022-04-15 23:00:44
 * @LastEditors: Please set LastEditors
 * @Description: 关于任务组 hook
 * @FilePath: /jira/src/utils/task.ts
 */

import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";
import { SortProps } from "./kanban";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig,
} from "./use-optimistic-options";

/**
 * 请求任务组列表
 * @param param
 * @returns
 */
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  // param 为依赖项（param发生变化，useQuery重新调用）
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};

/**
 * 看板中 - 添加任务
 * @param queryKey
 * @returns
 */
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

/**
 * 请求任务详情
 * @param id
 * @returns
 */
export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id), // 是否调用 useQuery
  });
};

/**
 * 编辑task
 * @param querykey
 * @returns
 */
export const useEditTask = (querykey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(querykey)
  );
};

/**
 * 删除任务
 * @param querykey
 * @returns
 */
export const useDeleteTask = (querykey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(querykey)
  );
};

/**
 * 任务排序
 * @returns
 */
export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: SortProps) => {
    return client("tasks/reorder", {
      method: "POST",
      data: params,
    });
  }, useReorderTaskConfig(queryKey));
};
