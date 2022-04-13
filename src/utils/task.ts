/*
 * @Author: flh
 * @Date: 2022-04-13 10:59:12
 * @LastEditTime: 2022-04-13 11:00:24
 * @LastEditors: Please set LastEditors
 * @Description: 关于任务组 hook
 * @FilePath: /jira/src/utils/task.ts
 */

import { useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";

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
