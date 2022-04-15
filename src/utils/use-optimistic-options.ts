/*
 * @Author: your name
 * @Date: 2022-04-12 16:53:15
 * @LastEditTime: 2022-04-15 22:34:57
 * @LastEditors: Please set LastEditors
 * @Description: 关于乐观更新的配置 hook
 * @FilePath: /jira/src/utils/use-optimistic-options.ts
 */

import { QueryKey, useQueryClient } from "react-query";
import { Project } from "types/project";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();

  return {
    // 请求后即时刷新缓存数据
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // useMutation一发生，就立马调用 onMutate
    async onMutate(target: any) {
      // 获取 querykey 对应的缓存
      const previousItems = queryClient.getQueryData(queryKey);
      // 修改缓存
      queryClient.setQueryData(queryKey, (old?: Project[]) => {
        return callback(target, old);
      });

      return { previousItems };
    },
    onError(error: any, nextItem: any, context: any) {
      //  出错回滚
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : [target]));

// 拖拽排序 乐观更新
export const useReorderConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => old || []);
