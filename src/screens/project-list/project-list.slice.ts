/*
 * @Author: flh
 * @Date: 2022-04-10 20:57:27
 * @LastEditTime: 2022-04-10 22:32:45
 * @LastEditors: Please set LastEditors
 * @Description: project-list 相关的reducer
 * @FilePath: /jira/src/screens/project-list/project-list.slice.ts
 */

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

// 定义状类型 State
interface State {
  projectModalOpen: boolean;
}

// 默认状态树 initialState
const initialState: State = {
  projectModalOpen: false,
};

// 创建slice（reducer）
export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    // 打开
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    // 关闭
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});

// actions
export const projectListActions = projectListSlice.actions;

// selector  从store的reducer中读取 projectList -> projectModalOpen
export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen;
