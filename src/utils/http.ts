/*
 * @Author: flh
 * @Date: 2022-04-01 22:21:46
 * @LastEditTime: 2022-04-13 11:04:27
 * @LastEditors: Please set LastEditors
 * @Description: 关于网络请求 hook
 *  注意：fetch请求 除了断网、网络连接失时会被catch捕获到，其他的异常像 4XX, 5XX等异常均不会被捕获到
 * @FilePath: /jira/src/utils/http.ts
 */

import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

/**
 * 通用网络请求
 * @param endpoint
 * @param param1
 * @returns
 */
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        // token 失效
        await auth.logout();
        window.location.reload(); // fresh page
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

/**
 * 自定义 http hook，
 * @desciption Parameters为typescript的操作符，根据http函数的参数及泛型推断出【endpoint, config】的类型
 * @returns
 */
export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
