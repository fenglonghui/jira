/*
 * @Author: flh
 * @Date: 2022-03-30 17:16:22
 * @LastEditTime: 2022-04-07 22:09:52
 * @LastEditors: Please set LastEditors
 * @Description: 查询列表
 * @FilePath: /jira/src/screens/project-list/list.jsx
 */
import React from "react";
import { Table, TableProps } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

// return <Pin checked={project.pin} onCheckedChange={ pin => {
// 普通函数中不能调用Hook 函数， hook函数必须放在顶层或hook函数中
// TODO 收藏/取消接口调用
// useEditProject(project.id, { pin: checked})  // 普通函数中不能调用 useEditProject（hook函数）
// mutate({id: project.id, pin});
// pinProject(project.id, pin);
// }} />

export const List = ({ users, ...props }: ListProps) => {
  // hook函数必须放在顶层或hook函数中
  const { mutate } = useEditProject();

  // const pinProject = (id: number, pin: boolean) => mutate({id, pin})
  // 函数柯理化改造
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
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
