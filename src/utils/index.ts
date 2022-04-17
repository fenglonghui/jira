/*
 * @Author: flh
 * @Date: 2022-03-30 21:19:11
 * @LastEditTime: 2022-04-17 20:24:47
 * @LastEditors: Please set LastEditors
 * @Description: 公共的 hook
 * @FilePath: /jira/src/utils/index.ts
 */

import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// let a: object;
// a = {}
// a = () => {}
// a = []
// a = new RegExp('')

// let b: { [key: string]: unknown};
// b = { name: 'jack' }
// b = () => {}

// 在一个函数里，改变传入的对象本身是不好
export const cleanObject = (object?: { [key: string]: unknown }) => {
  if (!object) {
    return {};
  }
  // const result = Object.assign({}, object);
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key]; // 去除对象中key属性及其对应的值为空的该行字段
    }
  });
  return result;
};

/*** 自定义 Custm Hook 提取并复用组件代码 **/

/**
 * 组件初始化时，调用一次，相当于class组件时代的componentDidMount方法
 * @param {*} callback
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback && callback();
    // TODO 依赖项里加上callback，会导致无限循环渲染，这个和useCallback及useMemo有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/**
 * 防抖，用于快速的输入事件中、🤚标事件等
 * @param {*} func
 * @param {*} delay
 * @returns
 */
// export const useDebounce = (func, delay) => {
//   let timeout;
//   return () => {
//     if(timeout){
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function(){
//       func && func();
//     }, delay);
//   }
// }

// 用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设定一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后在运行，清除上一个timeout，即上一个缓存的timeout取消
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

// 数组管理
export const useArray = <P>(initialArray: P[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: P) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const cloneValue = [...value];
      cloneValue.splice(index, 1);
      setValue(cloneValue);
    },
  };
};

/**
 * 返回组件的挂载状态，如果还没挂载或已卸载 返回false，反之，返回true
 * @returns
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};

// 修改浏览器页面title（闭包的使用）
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // 页面加载时: 旧title， useRef保存数据在组件整个生命周期中不变
  const oldTitle = useRef(document.title).current;

  // 加载后：新title
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖，读到的就是旧title
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
