/*
 * @Author: flh
 * @Date: 2022-04-13 11:41:44
 * @LastEditTime: 2022-04-14 10:38:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /jira/src/screens/kanban/util.ts
 */

import { useMemo } from "react";
import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";

/**
 * 获取url中的 project id
 * @returns
 */
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

/**
 * 获取当前url中id对应的项目
 * @returns
 */
export const useProjectInUrl = () => useProject(useProjectIdInUrl());

// 项目-看板 {projectId: id}
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
// 项目看板 querykey ['kanbans', {projectId: id}]
export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams()];

// 项目-任务组 {projectId: id}
export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam([
    "name", // 任务名
    "typeId", // bug, task
    "processorId", // 经办人id
    "tagId", // 搜索后显示的高亮标签id
  ]);
  const projectId = useProjectIdInUrl();

  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};

// 项目-任务组 [tasks, {projectId: id}]
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
