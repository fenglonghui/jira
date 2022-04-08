/*
 * @Author: flh
 * @Date: 2022-04-05 00:24:00
 * @LastEditTime: 2022-04-08 08:01:57
 * @LastEditors: Please set LastEditors
 * @Description: 抽象用户列表
 * @FilePath: /jira/src/utils/user.ts
 */

import { useEffect } from "react";
import { User } from "screens/project-list/search-panel";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useQuery } from "react-query";

/**
 * 用户数据请求
 * @param param
 * @returns
 */
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

// export const useUsers = (param?: Partial<User>) => {
//   const client = useHttp();

//   return useQuery<User[]>(["users", param], () =>
//     client("users", { data: param })
//   );
// };
