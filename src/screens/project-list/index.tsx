/*
 * @Author: flh
 * @Date: 2022-03-30 17:11:52
 * @LastEditTime: 2022-04-08 12:44:38
 * @LastEditors: Please set LastEditors
 * @Description: 搜索+列表
 * @FilePath: /jira/src/screens/project-list/index.jsx
 */
import React, { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
// import { Helmet } from "react-helmet";
// import { useUrlQueryParam } from "utils/url";
import { useProjectSearchParam } from "./util";

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
    retry,
  } = useProjects(useDebounce(param, 1000)); // 防抖的使用  传参 param 进来
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

// 跟踪该页面无限渲染的原因
// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
