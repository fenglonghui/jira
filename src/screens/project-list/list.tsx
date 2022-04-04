/*
 * @Author: flh
 * @Date: 2022-03-30 17:16:22
 * @LastEditTime: 2022-04-04 18:38:13
 * @LastEditors: Please set LastEditors
 * @Description: 查询列表
 * @FilePath: /jira/src/screens/project-list/list.jsx
 */
import React from "react";
import { Table } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
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
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          key: "name",
        },
        {
          title: "部门",
          dataIndex: "organization",
          key: "organization",
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
          key: "mainperson",
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span key={project.id}>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
          key: "created",
        },
      ]}
      dataSource={list}
    ></Table>
  );
};
