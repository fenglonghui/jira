/*
 * @Author: flh
 * @Date: 2022-04-13 10:52:27
 * @LastEditTime: 2022-04-13 21:07:39
 * @LastEditors: Please set LastEditors
 * @Description: 关于看板 hook
 * @FilePath: /jira/src/utils/kanban.ts
 */

import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";

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
