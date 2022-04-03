/*
 * @Author: flh
 * @Date: 2022-04-01 21:50:44
 * @LastEditTime: 2022-04-03 19:28:12
 * @LastEditors: Please set LastEditors
 * @Description: 认证页面
 * @FilePath: /jira/src/authenticated-app.tsx
 */
import { useAuth } from "context/auth-context";
import React from "react";
import styled from "@emotion/styled";
import { ProjectListScreen } from "screens/project-list";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <PageHeader>
        <button onClick={logout}>登出</button>
      </PageHeader>
      <Main>
        <ProjectListScreen />
      </Main>
    </div>
  );
};

const PageHeader = styled.header`
  height: 6rem;
  background-color: gray;
`;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;
