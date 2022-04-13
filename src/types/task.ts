/*
 * @Author: flh
 * @Date: 2022-04-13 10:47:13
 * @LastEditTime: 2022-04-13 10:50:35
 * @LastEditors: Please set LastEditors
 * @Description: 任务组
 * @FilePath: /jira/src/types/task.ts
 */

export interface Task {
  id: number;
  name: string;
  // 经办人
  processorId: number;
  projectId: number;
  epicId: number;
  kanbanId: number;
  typeId: number;
  note: string;
}
