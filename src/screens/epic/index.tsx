/*
 * @Author: flh
 * @Date: 2022-04-05 22:50:12
 * @LastEditTime: 2022-04-16 10:57:54
 * @LastEditors: Please set LastEditors
 * @Description: 任务组页面
 * @FilePath: /jira/src/screens/epic/index.tsx
 */

import React, { useState } from "react";
import { Row, ScreenContainer } from "components/lib";
import { useProjectInUrl } from "screens/kanban/util";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useEpicQueryKey, useEpicSearchParams } from "./util";
import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { useTasks } from "utils/task";
import { Link } from "react-router-dom";
import { CreateEpic } from "./create-epic";
import { Epic } from "types/epic";

export const EpicScreen = () => {
  const { data: currProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicQueryKey());
  // 是否打开添加任务弹窗
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  /**
   * 删除任务组
   * @param epic
   */
  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组: ${epic.name}`,
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currProject?.name}任务组</h1>
        <Button
          type={"link"}
          onClick={() => setEpicCreateOpen(true)}
          key={"epic_create_group"}
        >
          创建任务组
        </Button>
      </Row>
      <List
        style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button type={"link"} onClick={() => confirmDeleteEpic(epic)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间: {dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间: {dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((curTask) => (
                  <Link
                    to={`/projects/${currProject?.id}/kanban?editingTaskId=${curTask.id}`}
                    key={curTask.id}
                  >
                    {curTask.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </ScreenContainer>
  );
};
