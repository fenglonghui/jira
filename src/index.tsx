/*
 * @Author: flh
 * @Date: 2022-03-29 22:28:33
 * @LastEditTime: 2022-04-01 13:57:15
 * @LastEditors: your name
 * @Description: 入口文件
 * @FilePath: /jira/src/index.tsx
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadDevTools } from "jira-dev-tool";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
