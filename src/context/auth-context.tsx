/*
 * @Author: flh
 * @Date: 2022-04-01 19:34:21
 * @LastEditTime: 2022-04-13 10:25:02
 * @LastEditors: Please set LastEditors
 * @Description: Context上下文的创建、使用（代替之前redux）
 * @FilePath: /jira/src/context/auth-context.tsx
 */
import React, { useState } from "react";
import * as auth from "auth-provider";
import { User } from "types/user";
import { http } from "utils/http";
import { useMount } from "utils";
import { useQueryClient } from "react-query";

interface AuthForm {
  username: string;
  password: string;
}

// 初始化用户信息
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }

  return user;
};

// 1. 创建Context上下文
const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

// 给Context上下文命名
AuthContext.displayName = "AuthContext";

// 2. 定义Context上下文Provider组件
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 维护当前登录用户信息
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });

  useMount(() => {
    // 初始化用户信息
    bootstrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// 3. 获取Context上下文对象
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }

  return context;
};
