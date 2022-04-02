/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Author: flh
 * @Date: 2022-04-01 21:40:33
 * @LastEditTime: 2022-04-02 17:13:18
 * @LastEditors: Please set LastEditors
 * @Description: 非认证页面（登录/注册切换页面）
 * @FilePath: /jira/src/unauthenticated-app/index.tsx
 */
import React, { useState } from "react";
import { Card } from "antd";
import { LoginScreen } from "unauthenticated-app/login";
import { RegistScreen } from "./register";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? <RegistScreen /> : <LoginScreen />}
        <a onClick={() => setIsRegister(!isRegister)}>
          切换到{!isRegister ? "注册" : "登录"}
        </a>
      </Card>
    </div>
  );
};
