/*
 * @Author: flh
 * @Date: 2022-04-05 20:31:00
 * @LastEditTime: 2022-04-05 23:14:08
 * @LastEditors: Please set LastEditors
 * @Description: 项目面饭
 * @FilePath: /jira/src/screens/project/index.tsx
 */
import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import { KanBanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"kanban"} element={<KanBanScreen />} />
        <Route path={"epic"} element={<EpicScreen />} />
        <Route index element={<Navigate to={"kanban"} replace={true} />} />
      </Routes>
    </div>
  );
};
