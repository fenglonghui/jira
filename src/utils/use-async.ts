/*
 * @Author: flh
 * @Date: 2022-04-04 22:18:06
 * @LastEditTime: 2022-04-08 15:18:53
 * @LastEditors: Please set LastEditors
 * @Description: 高级Hook：useAsync统一处理Loading和Error状态
 * @FilePath: /jira/src/utils/use-async.ts
 */

import { useState } from "react";
import { useMountedRef } from "utils";

/**
 * 定义 State 类型
 * error: 错误信息
 * data: 数据
 * stat: 未发生/等待 | 正在发生 | 已发生结束报错 | 已发生结束成功
 */
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

// 设置默认值
const defaultInitialState: State<null> = {
  stat: "idle", // 默认为未发生状态
  error: null,
  data: null,
};

/**
 * 自定义高级hook：useAsync统一处理Loading和Error状态
 * @param initialState
 */
export const useAsync = <D>(initialState?: State<D>) => {
  // 存储数据状态
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
  });

  const mountedRef = useMountedRef();

  // 使用 retry 缓存 run函数及Promise对象，更新页面, retry就是一个函数
  const [retry, setRetry] = useState(() => () => {});

  // 设置data (网络请求成功调用该函数)
  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  // 设置error (网络请求失败调用该函数)
  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  // run 触发异步请求, 为了实现缓存run函数实现刷新数据，需要改造
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }

    // 缓存 run 函数和网络请求
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig.retry(), runConfig); // 缓存 run 函数和 网络请求结果Promise
      }
    });

    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        if (mountedRef.current) setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    setData,
    setError,
    run,
    retry,
    ...state,
  };
};
