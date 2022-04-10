/*
 * @Author: flh
 * @Date: 2022-04-01 19:33:57
 * @LastEditTime: 2022-04-10 22:17:37
 * @LastEditors: Please set LastEditors
 * @Description: app provider
 * @FilePath: /jira/src/context/index.ts
 */
import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "store";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};
