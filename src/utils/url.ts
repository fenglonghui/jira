/*
 * @Author: flh
 * @Date: 2022-04-06 14:04:17
 * @LastEditTime: 2022-04-12 19:46:56
 * @LastEditors: Please set LastEditors
 * @Description: 初步实现useUrlQueryParam 管理url参数状态
 *      使用useMemo传入创建函数和依赖项，并返回memoized值，只有在依赖项发生改变时重新计算该值
 * @FilePath: /jira/src/utils/url.ts
 */
import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

/**
 * 返回页面url中，指定键的参数值
 * @param keys 指定键数组
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParam] = useSearchParams();

  const setSearchParams = useSetUrlSearchParam();
  // searchParam react认为是当前组件的state，一般不会变，除非刻意使用setSearchParam，react此时认为searchParam发生变化

  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParam.get(key) || "" };
        }, {} as { [key in K]: string }),

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParam] // TODO 依赖里没有keys
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

/**
 * 浏览器参数
 * @returns
 */
export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();

  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
