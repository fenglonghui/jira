/*
 * @Author: flh
 * @Date: 2022-04-10 20:05:20
 * @LastEditTime: 2022-04-11 11:26:53
 * @LastEditors: Please set LastEditors
 * @Description: store
 * @FilePath: /jira/src/store/index.ts
 */
import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { projectListSlice } from "screens/project-list/project-list.slice";
import { authSlice } from "./auth.slice";

// 根 reducer
export const rootReducer = {
  auth: authSlice.reducer,
  projectList: projectListSlice.reducer,
};

// 唯一的 store
export const store = configureStore({
  reducer: rootReducer,
});

// dispatch
export type AppDispatch = typeof store.dispatch;

// RootState
export type RootState = ReturnType<typeof store.getState>;