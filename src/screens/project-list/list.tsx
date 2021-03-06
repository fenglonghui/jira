/*
 * @Author: flh
 * @Date: 2022-03-30 17:16:22
 * @LastEditTime: 2022-04-16 21:37:56
 * @LastEditors: Please set LastEditors
 * @Description: 项目列表组件
 * @FilePath: /jira/src/screens/project-list/list.jsx
 */
import React from "react";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import { User } from "types/user";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { Project } from "types/project";

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

export const List = React.memo(({ users, ...props }: ListProps) => {
  console.log("list render");
  // hook函数必须放在顶层或hook函数中
  const { mutate } = useEditProject(useProjectsQueryKey());
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
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    ></Table>
  );
});

export const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());

  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗?",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteProject({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"} onClick={editProject(project.id)}>
            编辑
          </Menu.Item>
          <Menu.Item
            key={"delete"}
            onClick={() => confirmDeleteProject(project.id)}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
