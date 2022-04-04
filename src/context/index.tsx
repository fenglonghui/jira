/*
 * @Author: flh
 * @Date: 2022-04-01 19:33:57
 * @LastEditTime: 2022-04-04 18:41:02
 * @LastEditors: Please set LastEditors
 * @Description: app provider
 * @FilePath: /jira/src/context/index.ts
 */
import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
