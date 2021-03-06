/*
 * @Author: flh
 * @Date: 2022-04-01 21:50:44
 * @LastEditTime: 2022-04-17 20:30:48
 * @LastEditors: Please set LastEditors
 * @Description: 认证页面
 * @FilePath: /jira/src/authenticated-app.tsx
 */
import { useAuth } from "context/auth-context";
import React from "react";
import styled from "@emotion/styled";
import { ProjectListScreen } from "screens/project-list";
import { ButtonNoPadding, Row } from "components/lib";
// import softWareLogo from 'assets/software-logo.svg';
import { ReactComponent as SoftWareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Route, Routes } from "react-router";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";
import { UserPopover } from "components/user-popover";

export default function AuthenticatedApp() {
  // 状态提升，控制模态窗打开/关闭， 引发属性下钻问题和耦合问题（可以采用组件组合来优化）
  // const [projectModalOpen, setProjectModalOpen] = useState(false);
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
      <PageHeader />
      <Main>
        <Routes>
          <Route path={"projects"} element={<ProjectListScreen />} />
          <Route path={"projects/:projectId/*"} element={<ProjectScreen />} />
          <Route index element={<ProjectListScreen />} />
        </Routes>
      </Main>
      <ProjectModal />
    </Container>
  );
}

const PageHeader = () => {
  const { logout, user } = useAuth();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* <img src={softWareLogo} alt="" /> */}
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftWareLogo width={"18rem"} color={"rgb(38, 132,255)"} />
        </ButtonNoPadding>
        <ProjectPopover />
        <UserPopover />
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

const HeaderRight = styled.div``;
const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
