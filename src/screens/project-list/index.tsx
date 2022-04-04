/*
 * @Author: flh
 * @Date: 2022-03-30 17:11:52
 * @LastEditTime: 2022-04-04 15:57:11
 * @LastEditors: Please set LastEditors
 * @Description: 搜索+列表
 * @FilePath: /jira/src/screens/project-list/index.jsx
 */
import React, { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  // 状态提升
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const [users, setUsers] = useState([]);

  // 防抖的使用
  const debounceParam = useDebounce(param, 500);

  const [list, setList] = useState([]);

  const client = useHttp();

  useEffect(() => {
    // 请求列表（防抖的使用）
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);

  useMount(() => {
    // 请求用户列表
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
