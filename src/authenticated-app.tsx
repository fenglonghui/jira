/*
 * @Author: flh
 * @Date: 2022-04-01 21:50:44
 * @LastEditTime: 2022-04-04 15:24:52
 * @LastEditors: Please set LastEditors
 * @Description: 认证页面
 * @FilePath: /jira/src/authenticated-app.tsx
 */
import { useAuth } from "context/auth-context";
import React from "react";
import styled from "@emotion/styled";
import { ProjectListScreen } from "screens/project-list";
import { Row } from "components/lib";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const HeaderItem = styled.h3`
  margin-right: 3rem;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)``;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;
const Main = styled.main`
  height: calc(100vh - 6rem);
`;
