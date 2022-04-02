/*
 * @Author: flh
 * @Date: 2022-03-30 17:16:22
 * @LastEditTime: 2022-04-02 17:35:49
 * @LastEditors: Please set LastEditors
 * @Description: 查询列表
 * @FilePath: /jira/src/screens/project-list/list.jsx
 */
import React from "react";
import { Table } from "antd";
import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ users, list }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "项目名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span key={project.id}>
                {users?.find((user) => user.id === project.personId)?.name}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    ></Table>
  );
};
