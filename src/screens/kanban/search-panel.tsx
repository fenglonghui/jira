/*
 * @Author: flh
 * @Date: 2022-04-13 18:25:56
 * @LastEditTime: 2022-04-13 21:08:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /jira/src/screens/kanban/search-panel.tsx
 */
import { Button, Input } from "antd";
import { Row } from "components/lib";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import React from "react";
import { useSetUrlSearchParam } from "utils/url";
import { useTasksSearchParams } from "./util";

export const SearchPanel = () => {
  const searchParam = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      name: undefined,
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
    });
  };

  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={searchParam.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />

      <UserSelect
        defaultOptionName={"经办人"}
        value={searchParam.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />

      <TaskTypeSelect
        defaultOptionName={"类型"}
        value={searchParam.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />

      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};
