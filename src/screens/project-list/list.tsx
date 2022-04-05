/*
 * @Author: flh
 * @Date: 2022-03-30 17:16:22
 * @LastEditTime: 2022-04-05 22:20:45
 * @LastEditors: Please set LastEditors
 * @Description: 查询列表
 * @FilePath: /jira/src/screens/project-list/list.jsx
 */
import React from "react";
import { Table, TableProps } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          // dataIndex: "name",
          render(value, project) {
            return (
              <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
            );
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
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
        },
      ]}
      {...props}
    ></Table>
  );
};
