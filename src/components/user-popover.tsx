/*
 * @Author: 用户popover
 * @Date: 2022-04-16 11:10:24
 * @LastEditTime: 2022-04-16 11:32:25
 * @LastEditors: Please set LastEditors
 * @Description: 用户菜单弹窗
 * @FilePath: /jira/src/components/user-popover.tsx
 */

import React from "react";
import { List, Popover, Typography } from "antd";
import styled from "@emotion/styled";
import { useUsers } from "utils/user";

export const UserPopover = () => {
  // refetch 刷新
  const { data: users, refetch } = useUsers();

  // Popover content
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
    </ContentContainer>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      用户
    </Popover>
  );
};

const ContentContainer = styled.div`
  width: 12rem;
`;
