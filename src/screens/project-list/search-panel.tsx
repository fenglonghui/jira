/*
 * @Author: flh
 * @Date: 2022-03-30 17:17:36
 * @LastEditTime: 2022-03-31 11:14:08
 * @LastEditors: Please set LastEditors
 * @Description: 搜索面板
 * @FilePath: /jira/src/screens/project-list/search-panel.jsx
 */
import React from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}

// ts类型声明
interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <form action="">
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        >
          <option value="">负责人</option>
          {users?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
