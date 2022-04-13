/*
 * @Author: flh
 * @Date: 2022-04-05 00:24:00
 * @LastEditTime: 2022-04-13 11:06:12
 * @LastEditors: Please set LastEditors
 * @Description: 关于用户 hook
 * @FilePath: /jira/src/utils/user.ts
 */

import { useEffect } from "react";
import { User } from "types/user";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

/**
 * 获取用户列表
 * @param param
 * @returns
 */
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]); // TODO 依赖里没有run和client

  return result;
};

// export const useUsers = (param?: Partial<User>) => {
//   const client = useHttp();

//   return useQuery<User[]>(["users", param], () =>
//     client("users", { data: param })
//   );
// };
