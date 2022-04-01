/*
 * @Author: flh
 * @Date: 2022-04-01 11:48:01
 * @LastEditTime: 2022-04-01 12:23:47
 * @LastEditors: Please set LastEditors
 * @Description: 测试ts泛型（useArray方法添加泛型）
 * @FilePath: /jira/src/test/try-use-array.tsx
 */
import React from "react";
import { useArray, useMount } from "utils";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 22 },
  ];

  const { value, clear, removeIndex, add } = useArray(persons);

  useMount(() => {
    // TODO ???
    // console.log(value.notExist);
    // add({name: 'david'});
    // removeIndex("123");
  });

  return (
    <div>
      {/* 添加添加john */}
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      {/* 删除第一项 */}
      <button onClick={() => removeIndex(0)}>remove 0</button>
      {/* 清空列表 */}
      <button style={{ marginTop: "50px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person, index: number) => (
        <div style={{ marginBottom: "30px" }}>
          <span style={{ color: "red" }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
