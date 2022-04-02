/*
 * @Author: flh
 * @Date: 2022-04-01 12:30:54
 * @LastEditTime: 2022-04-02 16:25:58
 * @LastEditors: Please set LastEditors
 * @Description: 登录页面
 * @FilePath: /jira/src/screens/login/index.tsx
 */

import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Form, Button, Input } from "antd";

export const LoginScreen = () => {
  const { login } = useAuth();

  /**
   * 提交
   * @param event
   */
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
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
        <Button htmlType={"submit"} type={"primary"}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
