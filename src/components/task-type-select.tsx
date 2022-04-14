/*
 * @Author: flh
 * @Date: 2022-04-13 18:39:05
 * @LastEditTime: 2022-04-14 15:28:31
 * @LastEditors: Please set LastEditors
 * @Description: 任务选择框
 * @FilePath: /jira/src/components/task-type-select.tsx
 */

import React from "react";
import { useTaskTypes } from "utils/task-type";
import { IdSelect } from "./id-select";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes || []} {...props} />;
};
