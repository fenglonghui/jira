/*
 * @Author: 组件库
 * @Date: 2022-04-04 15:03:11
 * @LastEditTime: 2022-04-04 15:31:41
 * @LastEditors: Please set LastEditors
 * @Description: 使用emotion变量来动态表达css属性值
 * @FilePath: /jira/src/components/lib.ts
 */

import styled from "@emotion/styled";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  /* 给直接子元素设置属性 */
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    /* 使用emotion变量动态设置gap属性值 */
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;
