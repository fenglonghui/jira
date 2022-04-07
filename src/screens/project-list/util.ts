/*
 * @Author: flh
 * @Date: 2022-04-07 12:37:34
 * @LastEditTime: 2022-04-07 15:35:55
 * @LastEditors: Please set LastEditors
 * @Description:项目列表搜索参数
 * @FilePath: /jira/src/screens/project-list/util.ts
 */
import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

// 项目列表搜索参数
export const useProjectSearchParam = () => {
  // 处理从浏览器中获取参数，并修改参数类型
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // setParam({name1: "123"})  // 类型范围：{name: '', personId: string} 此时没报错，需要处理
  // 注意 从 url 中得到的参数都是string类型（来自useUrlQueryParam函数返回的第一个参数是不变的）

  // 浏览器url参数值类型和组件需要接收的数据类型不匹配,需要进行匹配处理， 处理param类型: { name: string, personId: string } --> { name: string, personId: number }
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};
