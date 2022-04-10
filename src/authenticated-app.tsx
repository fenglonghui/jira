/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Author: flh
 * @Date: 2022-04-01 21:50:44
 * @LastEditTime: 2022-04-10 19:06:45
 * @LastEditors: Please set LastEditors
 * @Description: 认证页面
 * @FilePath: /jira/src/authenticated-app.tsx
 */
import { useAuth } from "context/auth-context";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { ProjectListScreen } from "screens/project-list";
import { ButtonNoPadding, Row } from "components/lib";
// import softWareLogo from 'assets/software-logo.svg';
import { ReactComponent as SoftWareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";

export const AuthenticatedApp = () => {
  // 状态提升，控制模态窗打开/关闭， 引发属性下钻问题和耦合问题（可以采用组件组合来优化）
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  // 状态提升，控制模态窗打开/关闭， 引发属性下钻问题和耦合问题（可以采用组件组合来优化）
  // 组合组件(projectButton)改造
  // const projectButton=
  //           <ButtonNoPadding
  //             type="link"
  //             onClick={() => setProjectModalOpen(true)}
  //           >
  //             创建项目
  //       </ButtonNoPadding>

  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      <Main>
        <Router>
          <Routes>
            <Route
              path={"projects"}
              element={
                <ProjectListScreen setProjectModalOpen={setProjectModalOpen} />
              }
            />
            <Route path={"projects/:projectId/*"} element={<ProjectScreen />} />
            <Route
              index
              element={
                <ProjectListScreen setProjectModalOpen={setProjectModalOpen} />
              }
            />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: {
  setProjectModalOpen: (isopen: boolean) => void;
}) => {
  const { logout, user } = useAuth();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* <img src={softWareLogo} alt="" /> */}
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftWareLogo width={"18rem"} color={"rgb(38, 132,255)"} />
        </ButtonNoPadding>
        <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type={"link"} onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;
const Main = styled.main`
  height: calc(100vh - 6rem);
`;
