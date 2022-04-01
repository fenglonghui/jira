/*
 * @Author: flh
 * @Date: 2022-04-01 19:33:57
 * @LastEditTime: 2022-04-01 20:37:57
 * @LastEditors: Please set LastEditors
 * @Description: app provider
 * @FilePath: /jira/src/context/index.ts
 */
import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
