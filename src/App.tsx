/*
 * @Author: your name
 * @Date: 2022-03-29 22:28:33
 * @LastEditTime: 2022-04-01 13:17:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /jira/src/App.tsx
 */
import React from "react";
import { LoginScreen } from "screens/login";
import "./App.css";
import { ProjectListScreen } from "./screens/project-list";

function App() {
  return (
    <div className="App">
      <LoginScreen />
      {/* <ProjectListScreen /> */}
    </div>
  );
}

export default App;
