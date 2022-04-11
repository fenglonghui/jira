/*
 * @Author: flh
 * @Date: 2022-04-01 19:34:21
 * @LastEditTime: 2022-04-11 12:22:40
 * @LastEditors: Please set LastEditors
 * @Description: Context上下文的创建、使用（代替之前redux）
 * @FilePath: /jira/src/context/auth-context.tsx
 */
import React, { useCallback, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { useAsync } from "utils/use-async";

export interface AuthForm {
  username: string;
  password: string;
}

// 初始化用户信息
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }

  return user;
};

// 2. 定义Context上下文Provider组件
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
  } = useAsync<User | null>();

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  useMount(() => {
    // 初始化用户信息
    run(dispatch(authStore.bootstrap()));
  });

  return <div>{children}</div>;
};

// 使用redux thunk
export const useAuth = () => {
  // dispatch 类型转换处理
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectUser);

  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return {
    user,
    login,
    register,
    logout,
  };
};
