/*
 * @Author: flh
 * @Date: 2022-04-06 21:54:07
 * @LastEditTime: 2022-04-12 09:40:06
 * @LastEditors: Please set LastEditors
 * @Description: 封装 Select 组件
 * @FilePath: /jira/src/components/id-select.tsx
 */
import React from "react";
import { Select } from "antd";
import { Raw } from "types";

// 利用 React.ComponentProps 从 Select 组件上扒出它所有的props属性
type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value?: Raw | undefined | null;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * 1. 外部 value: 可以传 string，number，null，undefined 类型
 * 2. 外部 onChange 只回调 number | undefined 类型
 * 3. 当 isNaN(Number(value)) 为 true的时候，代表选择默认类型
 *    当选择默认类型的时候，onChange会回调 undefined类型
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;

  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(val) => onChange?.(toNumber(val) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}

      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

// value 可以是多个类型数据，故取 unknown 类型
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
