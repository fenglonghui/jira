/*
 * @Author: flh
 * @Date: 2022-04-01 21:50:44
 * @LastEditTime: 2022-04-03 23:22:25
 * @LastEditors: Please set LastEditors
 * @Description: 认证页面,使用grid布局设置表单页面
 * @FilePath: /jira/src/authenticated-app.tsx
 */
import { useAuth } from "context/auth-context";
import React from "react";
import styled from "@emotion/styled";
import { ProjectListScreen } from "screens/project-list";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      {/* <Header>
        <button onClick={logout}>登出</button>
      </Header>
      <Nav />
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside />
      <Footer /> */}
    </Container>
  );
};

// grid 布局
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer";
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
// const Header = styled.header`grid-area header`;
// const Main = styled.main`grid-area  main`;
// const Nav = styled.nav`grid-area nav`;
// const Aside = styled.aside`grid-area aside`;
// const Footer = styled.footer`grid-area footer`;
