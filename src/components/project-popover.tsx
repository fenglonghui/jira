/*
 * @Author: flh
 * @Date: 2022-04-10 16:01:42
 * @LastEditTime: 2022-04-10 22:21:30
 * @LastEditors: Please set LastEditors
 * @Description: popover 鼠标移上去，下拉菜单显示出来
 * @FilePath: /jira/src/components/popover.tsx
 */
import React from "react";
import { List, Popover, Typography, Divider } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "screens/project-list/project-list.slice";

export const ProjectPopover = () => {
  // 通过hook 使用Redux管理状态
  const dispatch = useDispatch();

  const { data: projects } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);

  // Popover content
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        type="link"
        onClick={() => dispatch(projectListActions.openProjectModal())}
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      项目
    </Popover>
  );
};

const ContentContainer = styled.div`
  width: 12rem;
`;
