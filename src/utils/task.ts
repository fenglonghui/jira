/*
 * @Author: flh
 * @Date: 2022-04-13 10:59:12
 * @LastEditTime: 2022-04-14 09:58:58
 * @LastEditors: Please set LastEditors
 * @Description: 关于任务组 hook
 * @FilePath: /jira/src/utils/task.ts
 */

import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-options";

/**
 * 获取任务组列表
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
 * 看板中 - 新建任务
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
