/*
 * @Author: flh
 * @Date: 2022-04-01 12:30:54
 * @LastEditTime: 2022-04-01 21:44:09
 * @LastEditors: Please set LastEditors
 * @Description: 注册页面
 * @FilePath: /jira/src/screens/login/index.tsx
 */

import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";

export const RegistScreen = () => {
  const { register } = useAuth();

  /**
   * 提交
   * @param event
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    let password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
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
      <button type={"submit"}>注册</button>
    </form>
  );
};
