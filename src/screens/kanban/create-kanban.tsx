/*
 * @Author: flh
 * @Date: 2022-04-13 22:09:47
 * @LastEditTime: 2022-04-13 22:52:57
 * @LastEditors: Please set LastEditors
 * @Description: 创建看板
 * @FilePath: /jira/src/screens/kanban/create-kanban.tsx
 */
import React from "react";
import { Input } from "antd";
import { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { ColumContainer } from "./index";
import { useKanbanQueryKey, useProjectIdInUrl } from "./util";
import { Container } from "./kanban-column";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey());

  // 添加看板
  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <Input
        size={"large"}
        placeholder={"新建看板名称"}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};
