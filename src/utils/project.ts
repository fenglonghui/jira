/*
 * @Author: flh
 * @Date: 2022-04-05 00:10:24
 * @LastEditTime: 2022-04-12 16:48:02
 * @LastEditors: Please set LastEditors
 * @Description:
 *   useQuery 用于get请求
 *   useMutation 用于其它请求
 *
 * @FilePath: /jira/src/utils/projects.ts
 */

import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import { useProjectSearchParam } from "screens/project-list/util";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

/**
 * 工程列表接口
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

/**
 * 编辑， 请求收藏接口, 点击收藏或取消，调用收藏或取消网络接口，得到数据
 * @returns
 */
export const useEditProject = () => {
  // 1. 需要网络调用方法 client
  // 2. 调用useAsync,获取触发异步请求的方法
  // 3. 定义一个对外暴露的普通方法，并能接收外部传递进来的参数，方法中调用发网络请求调用，处理网络状态集
  // 3. 获取网络响应结果， 处理响应结果状态，得到需要的状态及数据，并返回 触发方法，请求状态，请求数据
  const client = useHttp();
  const queryClient = useQueryClient();

  // querykey：{key: value}
  const [searchParams] = useProjectSearchParam();
  // 获取 querykey
  const queryKey = ["projects", searchParams];

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      // 请求后即时刷新缓存数据
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      // useMutation一发生，就立马调用 onMutate
      async onMutate(target) {
        // 获取 querykey 对应的缓存
        const previousItems = queryClient.getQueryData(queryKey);
        // 修改缓存
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return (
            old?.map((oldProject) =>
              oldProject.id === target.id
                ? { ...oldProject, ...target }
                : { ...oldProject }
            ) || []
          );
        });

        return { previousItems };
      },
      onError(error, nextItem, context: any) {
        //  出错回滚
        queryClient.setQueryData(
          queryKey,
          (context as { previousItems: Project[] }).previousItems
        );
      },
    }
  );
};

/**
 * 添加收藏, useMutation网络请求成功后会调用onSuccess，即时刷新
 */
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

/**
 * 获取对应id的详情
 *    只要id变化，就会重新调用 useQuery 函数
 *    id为undefined时， enabled的值为false，此时useQuery不会被调用
 * @param id
 * @returns
 */
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery(["project", id], () => client(`projects/${id}`), {
    enabled: !!id, // 是否调用 useQuery
  });
};
