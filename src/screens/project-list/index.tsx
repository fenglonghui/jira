/*
 * @Author: flh
 * @Date: 2022-03-30 17:11:52
 * @LastEditTime: 2022-03-31 11:38:31
 * @LastEditors: Please set LastEditors
 * @Description: 搜索+列表
 * @FilePath: /jira/src/screens/project-list/index.jsx
 */
import React, { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from "utils";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  // 状态提升
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const [users, setUsers] = useState([]);

  // 防抖的使用
  const debounceParam = useDebounce(param, 1000);

  const [list, setList] = useState([]);

  useEffect(() => {
    // 请求列表（防抖的使用）
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParam]);

  useMount(() => {
    // 请求用户列表
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
};