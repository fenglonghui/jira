/*
 * @Author: flh
 * @Date: 2022-04-11 10:48:20
 * @LastEditTime: 2022-04-11 11:29:48
 * @LastEditors: Please set LastEditors
 * @Description: auth slice
 * @FilePath: /jira/src/store/auth.slice.ts
 */

import { User } from "screens/project-list/search-panel";
import { createSlice } from "@reduxjs/toolkit";
import * as auth from "auth-provider";
import { AuthForm, bootstrapUser } from "context/auth-context";
import { AppDispatch, RootState } from "store";

// 类型定义
interface State {
  user: User | null;
}

// 默认状态树
const initialState: State = {
  user: null,
};

// create slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

// actions
export const actions = authSlice.actions;

// thunk(异步action)
export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(actions.setUser(user)));
export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(actions.setUser(user)));
export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(actions.setUser(null)));
export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(actions.setUser(user)));

// selector
export const selectUser = (state: RootState) => state.auth.user;
