/*
 * @Author: flh
 * @Date: 2022-04-16 21:54:55
 * @LastEditTime: 2022-04-16 22:40:36
 * @LastEditors: Please set LastEditors
 * @Description: 追踪性能组件（追踪渲染过程）
 * @FilePath: /jira/src/components/profiler.tsx
 */
import React, { ProfilerOnRenderCallback, ProfilerProps } from "react";
import { Interaction } from "scheduler/tracing";

// 类型
type Props = { metadata?: any; phases?: ("mount" | "update")[] } & Omit<
  ProfilerProps,
  "onRender"
>;

// 队列
let queue: unknown[] = [];

// 发送队列
const sendProfileQueue = () => {
  if (!queue.length) {
    return;
  }

  const queueToSend = [...queue];
  queue = [];
  // 或打印，或上传服务器
  console.log(queueToSend);
};

// 每隔5s打印一次追踪信息
setInterval(sendProfileQueue, 5000);

// Profiler组件 生产环境禁运（只在test、develop环境起作用）
export const Profiler = ({ metadata, phases, ...props }: Props) => {
  const reportProfile: ProfilerOnRenderCallback = (
    id: string,
    phase: "mount" | "update",
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
    interactions: Set<Interaction>
  ) => {
    if (!phases || phases.includes(phase)) {
      // 添加追踪信息
      queue.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
        metadata,
      });
    }
  };

  return <React.Profiler onRender={reportProfile} {...props} />;
};
