/*
 * @Author: flh
 * @Date: 2022-04-07 12:37:34
 * @LastEditTime: 2022-04-12 19:53:47
 * @LastEditors: Please set LastEditors
 * @Description:项目列表搜索参数
 * @FilePath: /jira/src/screens/project-list/util.ts
 */
import { useMemo } from "react";
import { useProject } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

// 项目列表搜索参数
export const useProjectSearchParam = () => {
  // 处理从浏览器中获取参数，并修改参数类型
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // setParam({name1: "123"})  // 类型范围：{name: '', personId: string} 此时没报错，需要处理
  // 注意 从 url 中得到的参数都是string类型（来自useUrlQueryParam函数返回的第一个参数是不变的）

  // 浏览器url参数值类型和组件需要接收的数据类型不匹配,需要进行匹配处理， 处理param类型: { name: string, personId: string } --> { name: string, personId: number }
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

/**
 *  获取 query key
 * @returns
 */
export const useProjectsQueryKey = () => {
  const [params] = useProjectSearchParam();
  return ["projects", params];
};

/**
 * 关于模态窗的hook（扮演全局状态管理器的功能，可以替代redux context）
 * @returns
 */
export const useProjectModal = () => {
  // 获取url中对应的projectCreate的值
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  // 获取url中对应的editingProjectId的值
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const setUrlParams = useSetUrlSearchParam();

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  // const close = () => projectCreate ? setProjectCreate({ projectCreate: undefined }) : setEditingProjectId({ editingProjectId: undefined });
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  // tuple 类型（三个属性以内用tuple数组，三个属性以上用对对象）
  // return [
  //   projectCreate === 'true',
  //   open,
  //   close
  // ] as const

  return {
    projectModalOpen: projectCreate === "true" || !!editingProjectId,
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
