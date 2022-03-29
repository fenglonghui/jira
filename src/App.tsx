/*
 * @Author: your name
 * @Date: 2022-03-29 22:28:33
 * @LastEditTime: 2022-03-30 00:46:29
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /jira/src/App.tsx
 */
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Enter from "Enter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Enter />
      </header>
    </div>
  );
}

export default App;
