/**
 * @Author: flh
 * @Date: 2022-03-30 17:17:36
 * @LastEditTime: 2022-04-04 15:51:05
 * @LastEditors: Please set LastEditors
 * @Description: 搜索面板组件
 * @FilePath: /jira/src/screens/project-list/search-panel.jsx
 */
import React from "react";
import { Form, Input } from "antd";
import { Project } from "types/project";
import { UserSelect } from "components/user-select";
import { User } from "types/user";

// ts类型声明
interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          type="text"
          placeholder={"项目名称"}
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
