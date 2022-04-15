/* eslint-disable jsx-a11y/alt-text */
/*
 * @Author: 看板组件
 * @Date: 2022-04-13 12:02:07
 * @LastEditTime: 2022-04-15 23:06:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /jira/src/screens/kanban/kanban-column.tsx
 */

import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useKanbanQueryKey, useTasksModal, useTasksSearchParams } from "./util";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Mark } from "components/mark";
import { useDeleteKanban } from "utils/kanban";
import { Row } from "components/lib";
import React from "react";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

const TaskIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return (
    <img
      alt={"task-icon"}
      width={14}
      src={name === "task" ? taskIcon : bugIcon}
    />
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTasksSearchParams();

  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ cursor: "pointer", marginBottom: "0.5rem" }}
      key={task.id}
    >
      <p>
        <Mark name={task.name} keyword={keyword} />
      </p>
      <TaskIcon id={task.typeId} />
    </Card>
  );
};

/**
 * KanbanColumn 组件转发ref
 */
export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: Kanban }
>(({ kanban, ...props }, ref) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const currKanBanTasks = allTasks?.filter(
    (task) => task.kanbanId === kanban.id
  );

  return (
    <Container {...props} ref={ref}>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} key={kanban.id} />
      </Row>
      <TaskContainer>
        {/* 任务拖拽 */}
        <Drop
          type={"ROW"}
          direction={"vertical"}
          droppableId={String(kanban.id)}
        >
          <DropChild style={{ minHeight: "5px" }}>
            {currKanBanTasks?.map((task, taskIndex) => (
              <Drag
                key={task.id}
                index={taskIndex}
                draggableId={"task" + task.id}
              >
                <div>
                  <TaskCard key={task.id} task={task} />
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  );
});

// 删除看板
export const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbanQueryKey());
  const startEdit = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗?",
      onOk() {
        return deleteKanban({ id: kanban.id });
      },
    });
  };

  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={"link"} onClick={startEdit}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
