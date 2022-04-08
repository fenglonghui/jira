<!--
 * @Author: your name
 * @Date: 2022-03-29 22:28:33
 * @LastEditTime: 2022-04-08 15:26:49
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

    8. 优化searchpanel、list列表等页
        8.1 优化 search-panel.tsx
        8.2 优化 project-list/index
        8.1 安装时间处理库dayjs (时间处理库 moment库已经不维护了)
            yarn add dayjs
        8.3 .svg图片展示
            形式一: svg图片以img形式展示
                import softWareLogo from 'assets/software-logo.svg';
                <img src={softWareLogo} alt="" />
            形式二: svg图片以svg组件形式展示
                import { ReactComponent as SoftWareLogo } from 'assets/software-logo.svg';
                <SoftWareLogo />

    9. jira-dev-tool和系统冲突
        Warning: Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.

        解决方案：安装新版jira-dev-tool
        yarn add jira-dev-tool@next

# 八. 统一优雅的处理异常状态信息，提升用户体验

    1. 抽象项目列表
        自定义高级 hook：useAsync，useProjects hook
    2. 使用抽象用户列表
        自定义高级 hook：XXXX

    3. 线上应用错误捕获及处理
        3.1 开发错误边界组件 ErrorBoundary，处理全局错误异常信息
        3.2 三方库处理错误边界方案：使用react-error-boundary 库处理线上错误信息
        参照第三方库：https://github.com/bvaughn/react-error-boundary
    这样就我们就对全局错误做一个兜底的方案（线上异常处理）

# 九. 修改单页面浏览器 title

    1. 使用react-helmet修改页面 （react方式）
        yarn add react-helmet               (js)
        yarn add @types/react-helmet -D     (ts)
        <Helmet>
            <title>项目列表</title>
        </Helmet>
    2. 使用hook 修改页面title
       定义hook useDocumentTitle
    3. 使用useRef修改页面title

# 十. 配置 react-router

    1. 安装 React-router
        yarn add react-router@6.0.0-bata.0 react-router-dom@6.0.0-beta.0

    2. react-router 和 react-router-dom的区别
        类似 react和react-dom、react-native、react-vr的区别
        react是一个核心库，里面处理一些虚拟的、计算的、理论的逻辑，类似于我们在组件中state的状态、useEffect的状态怎么来影响虚拟dom树，这一次的虚拟Dom树和上一次的虚拟Dom树中间的diff运算，类似这种逻辑都是在react中处理的，得出的结果就会被react-dom消费，react-dom主要生活在浏览器的宿主环境里，里面充满了Dom操作，这些Dom操作只能在浏览器里运行，总之react-dom、react-native、react-vr都在消费React运算出来的结果。

        Route、Routes都是react-router中的引入进来，他们在内存中就像是一个变量或对象在路由上不停的计算这棵路由树是怎样的，而计算结果给react-router-dom消费或者给native消费

    3. 安装 history
        yarn add history

    4. 看板和epic路由

    5. 初步实现useUrlQueryParam 管理url参数状态
        利用react-router-dom通提供的hook：useSearchParams可获取请求参数
        定义 url.ts中定义hook -> useUrlQueryParam

        import { useSearchParams } from 'react-router-dom';
        const [searchParam, setSearchParam] = useSearchParams();
        // searchParam react认为它是当前组件的state，一般不会变，除非刻意使用setSearchParam，react此时认为searchParam发生变化

    6. 无限循环渲染问题
        1. 使用 why-did-you-render 库查找无限渲染原因
            安装 yarn add @welldone-software/why-did-you-render;
        2. 配置 wdyr.ts 脚本
        3. 在 src/index中第一句引入配置脚本
            import './wdyr.ts';
        4. 在指定页面 ProjectListScreen 设置追踪属性值，进行追踪原因
            // 跟踪该页面无限渲染的原因
            ProjectListScreen.whyDidYouRender = true;

        5. 原因：由于useUrlQueryParam hook函数每次返回新的对象，该对象会作为参数被传入 useDebounce hook函数中，而 useDebounce中的 useEffect的依赖项恰好就是该返回的新对象，导致循环渲染

        6. 解决方案
            使用useMemo包裹，该对象作为创建函数的返回值即可
            useMemo理解： 传入创建函数和依赖项，并返回memoized值，只有在依赖项发生改变时重新计算该值

        7. 泛型理解（针对 useUrlQueryParam Hook函数传参和接收参数的泛型理解）
                1. ['name', 'personId'] 、 ('name' | 'personId')[]、 K[] 的区别
                2  {} as {[key in K]: string} 此时 key 和 K 之间是啥关系？

```
                // const [keys] = useState<('name' | 'personId')[]>(['name', 'personId']);

                const [param] = useUrlQueryParam(['name', 'personId']);

                /**
                * 返回页面url中，指定键的参数值
                * @param keys 指定键数组
                */
                export const useUrlQueryParam = <K extends string>(keys: K[]) => {
                    const [searchParam, setSearchParam] = useSearchParams();
                    // searchParam react认为是当前组件的state，一般不会变，除非刻意使用setSearchParam，react此时认为searchParam发生变化
                    return [
                        useMemo(
                            () => keys.reduce((prev, key) => {
                                return { ...prev, [key]: searchParam.get(key) || '' }
                            }, {} as {[key in K]: string}),

                            // eslint-disable-next-line react-hooks/exhaustive-deps
                            [searchParam]),
                        setSearchParam
                    ] as const
                }
```

        8. 关于react-hook中的 依赖 的一个经典的坑（会导致渲染循环）

            解决方案总结：
                1. 基本类型 可以放到依赖里
                2. 组件状态 可以放到依赖里
                3. 非组件状态对象 绝不可以放到依赖里 （会导致渲染循环）

        9. iterator es6的一个概念，其中 {},[],Map都具有iterator特性，是可迭代的
            特点：可使用 for of 进行遍历
            Object.fromEntries(iterator)方法 把键值对列表转化为一个对象

            1. 查看对象、数组、Map 是否具有 iterator
                如: var a = [1,2,3];
                    a[Symbol.iterator] 是一个函数，即 f () {[native code]}
                    var i = a[Symbol.iterator]();
                    i.next();   // 迭代遍历 1
                    i.next();   // 迭代遍历 2
                    i.next();   // 迭代遍历 3
                    i.next();   // 迭代 结束

            2. 迭代过程打印

```
                var a = [1,2,3];
                // 查看是否具有 iterator属性， 实质是个函数
                a[Symbol.iterator] --> ƒ values() { [native code] }

                // 调用迭代函数
                var i = a[Symbol.iterator]();

                // 获取数组迭代器
                i --> Array Iterator {}[[Prototype]]: Array Iteratornext: ƒ next()length: 0name: "next"arguments: （…）caller: （…）[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]Symbol(Symbol.toStringTag): "Array Iterator"[[Prototype]]: Object

                // 调用迭代器的next函数，逐个遍历打印
                i.next()  ---> {value: 1, done: false}
                i.next()  ---> {value: 2, done: false}
                i.next()  ---> {value: 3, done: false}
                i.next()  ---> {value: undefined, done: true}
```

            3. 对象迭代器的实现
                iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js

                import "./styles.css";

```
                // 1. obj 实现了 Symbol.iterator
                const obj = {
                    data: ["hello", "world"],
                    [Symbol.iterator]() {
                        const self = this;
                        let index = 0;
                        return {
                            next() {
                                if (index < self.data.length) {
                                    return {
                                        value: self.data[index++],
                                        done: false
                                    };
                                } else {
                                    return { value: undefined, done: true };
                                }
                            }
                        };
                    }
                };

                // obj 实现了 Symbol.iterator ，故 obj可使用 for of 来迭代遍历
                for (let o of obj) {
                    console.log(o);
                }

```

# 十一. 实现 id-select.tsx，解决 id 类型 难题

    1. 添加id-select.tsx组件
        // 利用 React.ComponentProps 从 Select 组件上扒出改组件所具有的所有props属性
        type SelectProps = React.ComponentProps<typeof Select>;
        1. 定义组件自己类型，2 拔取原生组件所有属性作为继承属性
        2. 封装select组件
        3. 封装UserSelect组件
        4. 封装Spin组件（收藏组件：星星组件非二次封装）
            注意：普通函数不能调用Hook 函数， hook函数必须放在组件顶层或hook函数中
            1. 在普通的事件回调中， 采用设计在hook函数中定义并返回普通函数的方式，实现触发事件回调功能，从而规避了
            在普通函数中调用Hook函数(这是行不通的)
            const { mutate } = useEditProject();
            2. 收藏/取消功能 函数柯理化改造
            const pinProject = (id: number) => (pin: boolean) => mutate({id, pin})
            3. 收藏/取消功能实现，但页面还不能刷新
                ？？？

        5. useState传入的参数为函数时,被认为是惰性初始state，一上来就执行该函数，会认为数函数里运行的是一些昂贵的很耗性能的任务，执行一次之后，无论页面怎么刷新渲染都不再执行, 除非调用 set相关方法改变参数函数，才会再执行

            // 惰性初始化
            const [retry, setRetry] = useState(() => {
                alert('init');
            })

            一上来就执行参数函数，调用alert('init')，执行一次之后，无论页面怎么刷新都不再执行

            除非调用下面代码
                setRetry(() => {
                    alert('update');
                }),
            才会再执行

        存储函数的方式：
            1. 使用 useState 保存函数，不能直接传函数，需要传函数的函数: () => () => {}
                useState容器里保存的值是组件状态，会引起组件渲染
            2. 使用 useRef 存储函数
                useRef容器里保存的值是一个普通变量，并不是组件的状态，不会引起组件渲染

            3. 点击列表的收藏/取消功能后，刷新页面./project-list/index.tsx



    2. 修改相关id为 number 类型
        2.1 修改 /project-list/search-panel.tsx，
            User类型： id: number
            SearchPanelProps类型:  personId: number

        2.2 修改 /project-list/list.tsx
             Project类型: id: number, personId: number

        2.3 优化 SearchPanelProps 类型
            使用 Typescript中的 Utility type 优化 SearchPanelProps类型中的 param

```
            interface SearchPanelProps {
                users: User[];
                param: Pick<Project, 'name'|'personId'>;
                setParam: (param: SearchPanelProps[param]) => void

            }
```

# 十二. 优化并解决问题

        1. 对于hook函数的依赖项 缺少相关依赖字段时，而报出警告问题
            这个是一个 eslint 问题，可借助useCallback和useMemo解决

        2. 在进行耗时操作 或 长时间网络请求过程中，突然切换页面或退出该页面（replace掉当前页面）时，报出错误异常问题
            这是一个页面已卸载掉，但页面中的异步任务还在执行，试图设置数据，导致错误出现

            一般报错为：一个未挂载的组件不能执行React状态更新操作，this is a no-op, 它导致你的应用中发生内存泄漏
            Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function

            解决方案：定义hook函数 useMountedRef， 根据返回组件的挂载状态设置数据
                    /**
                    * 返回组件的挂载状态，如果还没挂载或已卸载 返回false，反之，返回true
                    * @returns
                    */
                    export const useMountedRef = () => {
                        const mountedRef = useRef(false);
                        useEffect(() => {
                            mountedRef.current = true;
                            return () => {
                            mountedRef.current = false;
                            }
                        })
                        return mountedRef;
                    }

                    const mountedRef = useMountedRef();
                    if(mountedRef.current) setData(data);

# 十三. 项目运行调试、编译、发布打包

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
