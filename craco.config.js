/*
 * @Author: flh
 * @Date: 2022-04-02 16:04:19
 * @LastEditTime: 2022-04-02 16:47:58
 * @LastEditors: Please set LastEditors
 * @Description: 自定义antd主题变量脚本
 * @FilePath: /jira/craco.config.js
 */
/* craco.config.js */
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "rgb(0, 82, 204)",
              "@font-size-base": "16px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
