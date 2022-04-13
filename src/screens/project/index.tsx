/*
 * @Author: flh
 * @Date: 2022-04-05 20:31:00
 * @LastEditTime: 2022-04-13 21:04:41
 * @LastEditors: Please set LastEditors
 * @Description: 项目面饭
 * @FilePath: /jira/src/screens/project/index.tsx
 */
import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes, Navigate, useLocation } from "react-router";
import { KanBanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();

  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"kanban"} element={<KanBanScreen />} />
          <Route path={"epic"} element={<EpicScreen />} />
          <Route index element={<Navigate to={"kanban"} replace={true} />} />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  display: flex;
  background-color: rgb(244, 245, 247);
`;

const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;
