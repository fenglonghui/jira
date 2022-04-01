/*
 * @Author: flh
 * @Date: 2022-04-01 12:30:54
 * @LastEditTime: 2022-04-01 13:23:49
 * @LastEditors: Please set LastEditors
 * @Description: 登录页面
 * @FilePath: /jira/src/screens/login/index.tsx
 */

import React, { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  /**
   * 登录
   * @param param
   */
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (response) => {
      if (response.ok) {
      }
    });
  };

  /**
   * 提交
   * @param event
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    let password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
