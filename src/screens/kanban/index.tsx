/*
 * @Author: flh
 * @Date: 2022-04-05 22:49:54
 * @LastEditTime: 2022-04-13 21:06:07
 * @LastEditors: Please set LastEditors
 * @Description: 看板页面
 * @FilePath: /jira/src/screens/kanban/index.tsx
 */

import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

export const KanBanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currKanban } = useProjectInUrl();

  const { data: kanbans } = useKanbans(useKanbanSearchParams());

  return (
    <ScreenContainer>
      <h1>{currKanban?.name}看板</h1>
      <SearchPanel />
      <ColumContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumContainer>
    </ScreenContainer>
  );
};

const ColumContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: scroll;
`;
