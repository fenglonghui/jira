/*
 * @Author: your name
 * @Date: 2022-04-13 17:04:06
 * @LastEditTime: 2022-04-13 17:22:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /jira/src/utils/task-type.ts
 */

import { useQuery } from "react-query";
import { TaskType } from "types/task-type";
import { useHttp } from "./http";

/**
 * 获取任务组列表
 * @param param
 * @returns
 */
export const useTaskTypes = () => {
  const client = useHttp();

  // param 为依赖项（param发生变化，useQuery重新调用）
  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
