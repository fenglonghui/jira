/*
 * @Author: flh
 * @Date: 2022-04-15 23:11:54
 * @LastEditTime: 2022-04-15 23:13:24
 * @LastEditors: Please set LastEditors
 * @Description: 任务组
 * @FilePath: /jira/src/types/epic.ts
 */

export interface Epic {
  id: number;
  name: string;
  projectId: number;
  // 开始时间
  start: number;
  // 结束时间
  end: number;
}
