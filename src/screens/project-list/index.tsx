/*
 * @Author: flh
 * @Date: 2022-03-30 17:11:52
 * @LastEditTime: 2022-04-15 17:29:32
 * @LastEditors: Please set LastEditors
 * @Description: 主页面（搜索， 项目列表）
 * @FilePath: /jira/src/screens/project-list/index.jsx
 */
import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Button, Row } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
// import { Helmet } from "react-helmet";
// import { useUrlQueryParam } from "utils/url";
import { useProjectModal, useProjectSearchParam } from "./util";
import { ErrorBox } from "components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  // const [keys] = useState<('name' | 'personId')[]>(['name', 'personId']);

  // const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // setParam({name1: "123"})  // 类型范围：{name: '', personId: string} 此时没报错，需要处理
  // 注意 从 url 中得到的参数都是string类型（来自useUrlQueryParam函数返回的第一个参数是不变的）

  // 处理 param类型
  // const projectParam = { ...param, personId: Number(param.personId)}

  const [param, setParam] = useProjectSearchParam();
  const {
    isLoading,
    error,
    data: list,
  } = useProjects(useDebounce(param, 1000)); // 防抖的使用  传参 param 进来
  const { data: users } = useUsers();

  const { open } = useProjectModal();

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>项目列表</h1>
        <Button type="link" onClick={() => open()}>
          创建项目
        </Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

// 跟踪该页面无限渲染的原因
// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 3.2rem;
`;
