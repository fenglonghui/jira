/*
 * @Author: flh
 * @Date: 2022-04-01 21:40:33
 * @LastEditTime: 2022-04-03 18:59:31
 * @LastEditors: Please set LastEditors
 * @Description: 非认证登录表单
 * @FilePath: /jira/src/unauthenticated-app/index.tsx
 */
import React, { useState } from "react";
import { Button, Card, Divider } from "antd";
import { LoginScreen } from "unauthenticated-app/login";
import { RegistScreen } from "./register";
import styled from "@emotion/styled";

import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Container>
      <Header />
      <BackGround />
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        {isRegister ? <RegistScreen /> : <LoginScreen />}
        <Divider />
        <a onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </a>
      </ShadowCard>
    </Container>
  );
};

export const LogButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 3.2rem;
  color: rgb(84, 108, 132);
`;

const BackGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
