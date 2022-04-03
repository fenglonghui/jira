<!--
 * @Author: your name
 * @Date: 2022-03-29 22:28:33
 * @LastEditTime: 2022-04-03 23:48:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /jira/README.md
-->

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# 一. 项目创建初始化、配置代码格式化、提交前检查、并自动格式化代码

# 1. create-react-app simple

npx create-react-app jira --template typescript

# 2. 设置 baseUrl，

在 tsconfig.json 文件中，设置统一的绝对路径，所有引入的也页面都是从 src 文件下来查找的

# 3. 安装统一的格式化工具 prettier

yarn add --dev --exact prettier

# 4. 创建配置文件.prettierrc.json、.prettierignore

# 5. 实现提交之前自动格式化文件内容，需安装工具

npx mrm lint-staged

# 6. 配置 lint-staged

"\*.{js,css,md,ts,tsx}": "prettier --write"

# 7. prettier 和 eslint 一起工作会有冲突，需要安装工具解决冲突 eslint-config-prettier

yarn add eslint-config-prettier -D

# 8. 提交代码之前检检测代码是否符合规范，安装工具 commitlint 来检查

yarn add @commitlint/config-conventional @commitlint/cli -D

# 9. 运行终端命令，创建 commitlint.config.js 配置文件

echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

# 10. 运行命令, 生成 commit-msg 文件

npx husky add .husky/commit-msg "yarn commitlint --edit $1"

# 二. mock 方案

## 1. 代码侵入（代码中写死 mock 数据/请求本地 json 文件）

## 2. 请求拦截

### 代表 Mock.js)， Mock.mock(url, get, {……})，支持 ajax，不支持 fetch

## 3. 接口管理工具, 如：rap、swagger、noco、yapi

## 4. 本地 node 服务器 （推荐使用）

### 代表 json-server 配置简单 30s 启动一个 restfull Api Serever

### 自定义程度高、增删改查真实模拟

### REST API 说明

    uri 代表资源/对象，method 代表行为
    GET    /tickets         列表
    GET    /tickets/12      详情
    POST   /tickets         增加
    PUT    /tickets/12      替换
    PATCH  /tickets/12      修改
    DELETE /tickets/12      删除

## 配置 mock 数据服务器

#### yarn add json-server -D

## 当前工程下创建 **json_server_mock** 文件夹，并在其中创建 db.json 文件（json_server_mock 文件名称前后加下划线'\_\_'表示该文件夹与项目没有关系，是一个辅助工具）

## package.json 文件中 scripts 中添加脚本命令 json-server

#### "json-server **json_server_mock**/db.json --watch"

## 启动 json-seerver mock 服务器

#### npm run json-server

## 配合 post man 进行网络请求填充数据，db.json 文件中，数据会自动动态获取进来

使用分布式服务器
安装命令：npx imooc-jira-tool

重启 service work
npx msw init public

# 三. 设置网络环境配置文件

    创建.env文件, .env.development文件, 设置网络请求的基本地址REACT_APP_API_URL（包含开发地址、线上地址）

    使用qs库处理网络请求的参数（http://localhost:3001/projects?name=&personId=2）
    参数 name=lisi&personId=2 被qs库自动处理成以key: value形式的存在

### yarn add qs

# 四. Custom Hook 提取并复用组件代码

    必须以use开头的函数， hook函数可放在hook函数中使用，也可放在函数组件中使用，不能放在普通函数中使用
    自定义hook前提：当一个函数里需要使用hook函数时，需要自定义hook函数，当一个函数里不需要使用hook函数时，定义一个普通函数即可
    自定义 useMount、useDebounce hook函数

# 五. typescript

    强类型的javascript，bug少了，编辑器提示快了，代码易读开发速度快了，在定义（变量、函数组件，hook等）typescript允许我们在定义的同时指定其类型
    将jsx文件转换成tsx文件，即js转换用ts
    ts 增强类型，减少bug

    Utility type详解：
    1. Parameters<typeof http> 获取和http一样类型的参数， 如 useHttp
    (...[endpoint, config]: Parameters<typeof http>)
    2. 联合类型
    let FavouriteNumber = string | number | {};
    3. 类型别名 type
    type FavouriteNumber = string | number;
    let resoeFavouriteNumber: FavouriteNumber = '23';
    4. type Person = {
        name: string,
        age: number,
    }

    5. interface 类型定义
    interface Person {
        name: string,
        age: number
    }

    // Partial可编辑某类型的属性（name和age都可编辑）
    6. const xiaoming: Partial<Person> = { name: 'xiaoming' };
       const xiaoming: Partial<Person> = {};
    // Omit 去除掉某类型的属性（name属性）
    7. const shenmiren: Omit<Person, 'name'> = {age: 10};
       const shenmiren: Omit<Person, 'name' | 'age'> = {};     // name age 都去掉
    // keyof 把Person中的key都取出来组合成联合类型
    8. type PersonKeys = keyof Person;
    // pick 从Person中挑出name键作为新的类型
    9. type PersonOnlyName = Pick<Person, 'name'>
    //  Exclude 从PersonKeys联合类型中过滤掉'name'属性（只要age）组成新类型
    10. type Age = Exclude<PersonKeys, 'name'>

### 1. ts 的类型

     number、
     string、
     array、
     boolean、
     tuple（混合类型的数组，不叫数组）
        数量固定，不同类型、
     函数、
     any(不做任何类型检查)、
     void、
     object、
     enum、
        enum Color {
            Red,
            Green,
            Blue,
        }
        let c: Color = Color.Green
     null和undefined
     unknown
        可以是任何类型的值，严格版的any，它是检查类型
        不能从unknown类型的变量上获取任何方法/也不能把unknown类型的变量赋值给其它变量
     never类型:
        const func = () => {
            throw new Error()
        }
     interface

    .d.ts
        js 文件 + .d.ts文件 === ts文件
        .d.ts文件可以让js文件继续维持自己js文件的身份，而拥有TS的类型保护

### ts 泛型

    example: function useState<S>(S | (() => S)):[S, dispatch<setAction<S>>];
    useState = <S>() => [S , dispatch<setAction<S>>];

    ts中类型是由泛型决定，不是类型推断决定的

    鸭子类型（duck typing）: 面向接口编程 而不是面向对象编程， ts就是duck类型的

# 七. 样式的引入

    引入 Ant design 和 Emotion 的组件库

    1. Emotion是css-in-js中最受欢迎库之一，初次之外还有（style-component）
        CSS-in-JS 是组织CSS代码的一种方式，代表库有emotion和styled-component
        传统CSS和CSS-in-JS比较区别：
            1.1 缺乏模块组织（CSS-in-JS可以模块化方式组织css）
            1.2 缺乏作用域（CSS只有全局作用域，CSS-in-JS生成独特选择符实现作用域的效果）
            1.3 隐式依赖，让样式难以追踪（CSS-in-JS把样式包裹起来，形成组件：styled-component）
            1.4 没有变量（CSS-in-JS可以有变量进行判断）
            1.5 CSS选择器与html元素耦合（CSS-in-JS的样式独立、易于修改）
            1.6 react 自带的css不支持处理伪类、级联等处理（CSS-in-JS支持）

    2. 适配全局页面视口高度（100vh）和尺寸单位比例（rem = 10px）

    3. 引入ant design组件库
        3.1 yarn add antd

        3.2 入口引入antd.less样式(务必放在jira-dev-tool后面)
            import "antd/dist/antd.less";

        3.3 自定义antd的主题变量，对默认配置自定义，需要安装craco工具
            3.3.1. yarn add @craco/craco
            3.3.2 修改package.json 的 "scripts"中的命令
                "start": "craco start",
                "build": "craco build",
                "test": "craco test",
            3.3.3 在项目根目录创建一个 craco.config.js 用于修改默认配置
            3.3.1 参照脚本文件内容
            3.3.2 参照配置主题：https://ant.design/docs/react/customize-theme-cn

            3.3.4 安装 craco-less 并修改 craco.config.js
                  yarn add craco-less

            3.3.5 引入antd 组件，并替换原来的标签

    4. 引入emotion组件库
        4.1 安装 CSS-in-JS库emotion
        yarn add @emotion/react @emotion/styled

        4.2 使用emotion的styled-component修改登录页的组件/标签样式
        4.2.1 emotion/styled-component用法：
              // 引入styled
              import styled from '@emotion/styled';
              标签用法（如 div）：
                const Container = styled.div`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 100vh;
                `
              组件用法(如：Card)
                const ShadowCard = styled(Card)`
                    width: 40rem;
                    min-height: 56rem;
                    padding: 3.2rem 4rem;
                    border-radius: 0.3rem;
                    box-sizing: border-box;
                    box-shadow: rgba(0,0,0,0.1) 0 0 10px;
                    text-align: center;
                `;
    5. 使用emotion，优化未认证表单组件页，如：
        Container
        Header
        BackGround
        ShadowCard
        Title
        Divider
        ShadowCard
        LogButton

    6. 使用emotion，优化认证后的列表组件（flex、grid布局的使用），如：
        PageHeader
        Main

    7.gird 和 flex 各自的应用场景
        7.1 要考虑，是一维布局 还是 二维布局
            一般来说，一维布局用flex，二维布局用grid
        7.2 是从内容出发还是从布局出发？
            7.2.1 flex 布局: 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
            7.2.1 grid 布局：先规划网格(数量一般比较固定)，然后再把元素往里填充

# 八. 项目运行调试、编译、发布打包

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
