/*
 * @Author: flh
 * @Date: 2022-04-05 00:24:00
 * @LastEditTime: 2022-04-16 11:30:15
 * @LastEditors: Please set LastEditors
 * @Description: 关于用户 hook
 * @FilePath: /jira/src/utils/user.ts
 */

import { useQuery } from "react-query";
import { User } from "types/user";
import { useHttp } from "./http";

/**
 * 获取用户列表
 * @param param
 * @returns
 */
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  // param 为依赖项（param发生变化，useQuery重新调用）
  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};
