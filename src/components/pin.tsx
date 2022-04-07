/*
 * @Author: flh
 * @Date: 2022-04-07 18:29:22
 * @LastEditTime: 2022-04-07 19:38:13
 * @LastEditors: Please set LastEditors
 * @Description: 收藏组件Pin
 * @FilePath: /jira/src/components/pin.tsx
 */

import React from "react";
import { Rate } from "antd";

interface PinProps extends Omit<React.ComponentProps<typeof Rate>, "onChange"> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Pin = ({ checked, onCheckedChange, ...resetProps }: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...resetProps}
    />
  );
};
