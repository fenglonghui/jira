/*
 * @Author: flh
 * @Date: 2022-04-17 15:38:14
 * @LastEditTime: 2022-04-17 16:31:10
 * @LastEditors: Please set LastEditors
 * @Description: hook 测试（useAsync）
 * @FilePath: /jira/src/__tests__/use-async.ts
 */

import { useAsync } from "utils/use-async";
import { act, renderHook } from "@testing-library/react-hooks";

const defaultState: ReturnType<typeof useAsync> = {
  stat: "idle",
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  setData: expect.any(Function),
  setError: expect.any(Function),
  run: expect.any(Function),
  retry: expect.any(Function),
};

const loadingState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: "loading",
  isIdle: false,
  isLoading: true,
};

const successState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: "success",
  isIdle: false,
  isSuccess: true,
};

/**
 * 测试单元
 */
test("useAsync 可以异步处理", async () => {
  let resolve: any, reject: any;

  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  // 渲染 useAsync hook
  const { result } = renderHook(() => useAsync());

  // result.current 是useAsync的返回值
  expect(result.current).toEqual(defaultState);

  let p: Promise<any>;

  act(() => {
    p = result.current.run(promise);
  });
  expect(result.current).toEqual(loadingState);

  const resolvedValue = { mockedValue: "resolved" };
  await act(async () => {
    resolve(resolvedValue);
    await p;
  });

  expect(result.current).toEqual({
    ...successState,
    data: resolvedValue,
  });
});
