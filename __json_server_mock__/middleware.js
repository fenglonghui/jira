/*
 * @Author: flh
 * @Date: 2022-04-01 13:27:12
 * @LastEditTime: 2022-04-01 13:37:52
 * @LastEditors: Please set LastEditors
 * @Description: 登录中间件（模拟登录接口），该中间件将注入json-server中去 --middlewares ./__json_server_mock__/middleware.js
 * @FilePath: /jira/__json_server_mock__/middleware.js
 */
module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "用户名或密码错误" });
    }
  }
  next();
};
