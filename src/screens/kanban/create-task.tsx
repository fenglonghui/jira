/*
 * @Author: flh
 * @Date: 2022-04-14 09:56:55
 * @LastEditTime: 2022-04-14 10:57:41
 * @LastEditors: Please set LastEditors
 * @Description: 看板中-新建任务
 * @FilePath: /jira/src/screens/kanban/create-task.tsx
 */

import { Card, Input } from "antd";
import { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";

/**
 * 某个看板中 - 新建任务
 * @param param0
 * @returns
 */
export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  // 输入任务名
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  // 输入状态（是否能输入）
  const [inputModal, setInputModal] = useState(false);

  // 创建任务提交
  const submit = async () => {
    if (!name) {
      return toggle();
    }
    addTask({ projectId, name, kanbanId });
    setInputModal(false);
    setName("");
  };

  const toggle = () => setInputModal((modal) => !modal);

  useEffect(() => {
    if (!inputModal) {
      setName("");
    }
  }, [inputModal]);

  if (!inputModal) {
    return <div onClick={toggle}>+创建事物</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        autoFocus={true}
        value={name}
        onPressEnter={submit}
        placeholder={"需要做些什么"}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  );
};
