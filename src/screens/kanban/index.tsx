/*
 * @Author: flh
 * @Date: 2022-04-05 22:49:54
 * @LastEditTime: 2022-04-16 22:48:09
 * @LastEditors: Please set LastEditors
 * @Description: 看板页面
 * @FilePath: /jira/src/screens/kanban/index.tsx
 */

import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { Spin } from "antd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { ScreenContainer } from "components/lib";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDocumentTitle } from "utils";
import { useKanbans, useReorderKanban } from "utils/kanban";
import { useReorderTask, useTasks } from "utils/task";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useKanbanQueryKey,
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";
import { Profiler } from "components/profiler";

export const KanBanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currKanban } = useProjectInUrl();

  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;

  const onDragEnd = useDragEnd(); // 拖拽排序的持久化

  return (
    <Profiler id={"看板页面"}>
      <DragDropContext onDragEnd={onDragEnd}>
        <ScreenContainer>
          <h1>{currKanban?.name}看板</h1>
          <SearchPanel />
          {isLoading ? (
            <Spin size="large" />
          ) : (
            <ColumContainer>
              <Drop
                type={"COLUMN"}
                direction={"horizontal"}
                droppableId={"kanban"}
              >
                <DropChild style={{ display: "flex" }}>
                  {kanbans?.map((kanban, index) => (
                    <Drag
                      key={kanban.id}
                      draggableId={"kanban" + kanban.id}
                      index={index}
                    >
                      <KanbanColumn kanban={kanban} key={kanban.id} />
                    </Drag>
                  ))}
                </DropChild>
              </Drop>
              <CreateKanban />
            </ColumContainer>
          )}
          <TaskModal />
        </ScreenContainer>
      </DragDropContext>
    </Profiler>
  );
};

export const ColumContainer = styled.div`
  display: flex;
  flex: 1;
  border-radius: 0.6rem;
  overflow-x: scroll;
`;

/**
 * 看板排序（任务组排序）- 持久化
 * @returns
 */
export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbanQueryKey());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());

  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }

      if (type === "COLUMN") {
        // 看板排序
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;

        if (!fromId || !toId || fromId === toId) {
          return;
        }

        const type = destination.index > source.index ? "after" : "before";

        reorderKanban({ fromId, referenceId: toId, type });
      }

      if (type === "ROW") {
        // 任务组排序
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        if (fromKanbanId === toKanbanId) {
          return;
        }
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }

        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [allTasks, kanbans, reorderKanban, reorderTask]
  );
};
