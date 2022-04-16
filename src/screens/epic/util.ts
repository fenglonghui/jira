/*
 * @Author: flh
 * @Date: 2022-04-15 23:36:20
 * @LastEditTime: 2022-04-15 23:38:45
 * @LastEditors: Please set LastEditors
 * @Description: 任务组
 * @FilePath: /jira/src/screens/epic/util.ts
 */

import { useProjectIdInUrl } from "screens/kanban/util";

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useEpicQueryKey = () => ["epics", useEpicSearchParams()];
