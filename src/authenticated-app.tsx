/*
 * @Author: flh
 * @Date: 2022-04-01 21:50:44
 * @LastEditTime: 2022-04-01 22:00:37
 * @LastEditors: Please set LastEditors
 * @Description: 认证页面
 * @FilePath: /jira/src/authenticated-app.tsx
 */
import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
};
