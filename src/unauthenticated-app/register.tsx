/*
 * @Author: flh
 * @Date: 2022-04-01 12:30:54
 * @LastEditTime: 2022-04-02 17:09:24
 * @LastEditors: Please set LastEditors
 * @Description: 注册页面
 * @FilePath: /jira/src/screens/login/index.tsx
 */

import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Button, Input } from "antd";

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
        <Button htmlType={"submit"} type={"primary"}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
