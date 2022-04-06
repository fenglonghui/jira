/*
 * @Author: flh
 * @Date: 2022-04-06 15:39:57
 * @LastEditTime: 2022-04-06 15:50:32
 * @LastEditors: Please set LastEditors
 * @Description: why-did-you-render 库配置脚本，追踪无限循环渲染原因
 * @FilePath: /jira/src/wdyr.ts
 */
import React from "react";

// 开发环境运行
if (process.env.NODE_ENV === "development") {
  // 引入库
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  // 启动 并传入React实例
  whyDidYouRender(React, {
    trackAllPureComponents: false, // true : 跟踪所有页面， false 不跟踪所有页面
  });
}
