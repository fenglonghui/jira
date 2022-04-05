/*
 * @Author: 错误边界组件开发
 * @Date: 2022-04-05 12:30:03
 * @LastEditTime: 2022-04-05 13:36:01
 * @LastEditors: Please set LastEditors
 * @Description: react官方讨论的错误边界的处理
 *      class组件中定义getDerivedStateFromError或componentDidCatch方法，任意一个或两个，这个组件就变成了错误边界
 *      React.PropsWithChildren泛型自带children，并于传过来的fallbackRender交叉合并为一起
 *      ErrorBoundary的子组件发生错误时，就会调用getDerivedStateFromError修改error值，渲染错误边界
 * @FilePath: /jira/src/components/error-boundary.tsx
 * 参照第三方库：https://github.com/bvaughn/react-error-boundary
 */

import React from "react";

// 类型重命名
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// 错误边界 需要透传 children、fallbackRender,
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };

  /**
   * ErrorBoundary子组件抛出异常，会调用该方法，修改error值从而渲染错误边界页面，显示错误信息
   * @param error
   */
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
