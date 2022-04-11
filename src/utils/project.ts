/*
 * @Author: flh
 * @Date: 2022-04-05 00:10:24
 * @LastEditTime: 2022-04-11 21:28:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /jira/src/utils/projects.ts
 */

import { useQuery } from "react-query";
import { Project } from "screens/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

/**
 * 网络请工程列表接口
 * @param param
 * @returns
 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // param 为依赖项（param发生变化，useQuery重新调用）
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

// 请求收藏接口, 点击收藏或取消，调用收藏或取消网络接口，得到数据
export const useEditProject = () => {
  // 1. 需要网络调用方法 client
  // 2. 调用useAsync,获取触发异步请求的方法
  // 3. 定义一个对外暴露的普通方法，并能接收外部传递进来的参数，方法中调用发网络请求调用，处理网络状态集
  // 3. 获取网络响应结果， 处理响应结果状态，得到需要的状态及数据，并返回 触发方法，请求状态，请求数据

  const client = useHttp();
  const { run, ...asyncResult } = useAsync();

  const mutate = (params: Partial<Project>) => {
    // 调用发网络请求，处理响应结果状态，得到需要的数据
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};

// 添加收藏
export const useAddProject = () => {
  const client = useHttp();
  const { run, ...asyncResult } = useAsync();

  const mutate = (params: Partial<Project>) => {
    // 调用发网络请求，处理响应结果状态，得到需要的数据
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};
