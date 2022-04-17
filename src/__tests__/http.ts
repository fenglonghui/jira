/*
 * @Author: flh
 * @Date: 2022-04-17 11:15:22
 * @LastEditTime: 2022-04-17 12:24:25
 * @LastEditors: Please set LastEditors
 * @Description: 自动化测试 - 传统单元测试，测试网络请求http函数
 *  使用mock方法测试，并不是在真正的请求，要自己能控制的
 *  msw 是用来给我们mock服务器数据的
 * @FilePath: /jira/src/__tests__/http.ts
 */
import { setupServer } from "msw/node";
import { rest } from "msw";
import { http } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

/**
 * 以下代码都是为了配置我们的mock环境
 */
const server = setupServer();

// jest 是对react最友好的一个测试库， beforeAll表示在执行所有的测试之前先来执行一下回调函数
beforeAll(() => server.listen());

// 每一个测试跑完以后，都重置mock路由
afterEach(() => server.resetHandlers());

// 所有的测试跑完后，关闭mock路由
afterAll(() => server.close());

// teast 代表一个测试单元, 测试http方法
test("http方法发送异步请求", async () => {
  const endpoint = "test-endpoint"; // 相当于 url
  const mockResult = { mockValue: "mock" };

  // 捕获发送的请求， mock request
  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) =>
      res(ctx.json(mockResult))
    )
  );

  // http 发送请求
  const result = await http(endpoint);

  // 期待
  expect(result).toEqual(mockResult);
});

/**
 * 测试单元
 *   测试http请求时，header中的token
 */
test("http请求时会在header里带上token", async () => {
  const token = "FAKE_TOKEN";
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  let request: any;

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await http(endpoint, { token });
  // toBe 严格相同
  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});
