/*
 * @Author: flh
 * @Date: 2022-04-01 19:11:08
 * @LastEditTime: 2022-04-07 17:31:48
 * @LastEditors: Please set LastEditors
 * @Description: 真实环境中，如果使用firebase这种第三方的auth服务，本文件不需要开发者开发
 * @FilePath: /jira/src/auth-provider.ts
 */
import { User } from "screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

/**
 * 获取token
 * @returns
 */
export const getToken = () => window.localStorage.getItem(localStorageKey);

/**
 * 存储token
 * @param param0
 * @returns
 */
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

/**
 * 登录
 * @param data
 * @returns
 */
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

/**
 * 注册
 * @param data
 * @returns
 */
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

/**
 * 注销
 * @returns
 */
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
