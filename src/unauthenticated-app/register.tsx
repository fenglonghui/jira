/*
 * @Author: flh
 * @Date: 2022-04-01 12:30:54
 * @LastEditTime: 2022-04-03 18:56:03
 * @LastEditors: Please set LastEditors
 * @Description: 注册页面
 * @FilePath: /jira/src/screens/login/index.tsx
 */

import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LogButton } from "unauthenticated-app";

export const RegistScreen = () => {
  const { register } = useAuth();

  /**
   * 提交
   * @param event
   */
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入用密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LogButton htmlType={"submit"} type={"primary"}>
          注册
        </LogButton>
      </Form.Item>
    </Form>
  );
};
