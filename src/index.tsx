/*
 * @Author: flh
 * @Date: 2022-03-29 22:28:33
 * @LastEditTime: 2022-04-16 22:43:18
 * @LastEditors: Please set LastEditors
 * @Description: 入口文件
 * @FilePath: /jira/src/index.tsx
 */
import "./wdyr.ts";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadServer, DevTools } from "jira-dev-tool";
// 务必在jira-dev-tool后面引入
import "antd/dist/antd.less";
import { AppProviders } from "context";
import { Profiler } from "components/profiler";

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <Profiler id={"Root App"} phases={["mount"]}>
        <AppProviders>
          <DevTools />
          <App />
        </AppProviders>
      </Profiler>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
