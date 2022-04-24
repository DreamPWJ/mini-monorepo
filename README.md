## 基于Lerna管理跨端小程序统一的MonoRepo单体式仓库 单仓多包 Taro技术栈

### 项目代号: athena(雅典娜 智慧女神) 愿景: 使项目更易于复用迭代维护扩展、分离关注点并避免代码重复

### monorepo 最主要的好处是统一的工作流和共享代码, 兼顾通用性和独立性之间的最佳平衡点, 统一最佳实战只需搭建一套脚手架, 统一管理(规范、配置、开发、联调、构建、测试、发布等)多个包
#### Turborepo解决Monorepo多项目构建缓慢问题 充分利用CPU性能并发构建提速

### 目录结构

- packages: 可复用的基础通用包
- projects-*: 多端项目业务包
- templates: 自定义灵活高效的代码生成器
- scripts: 自定义脚本 管理复杂多项目
- docs: 项目文档
- examples: 示例代码 常用代码模板和代码块提炼
- tests: 测试模块

### 小程序技术栈

- Taro
- React
- Lerna
- Vite
- Pnpm
- Tailwind CSS
- CSS Variables

### 安装lerna相关依赖
npm i -g lerna && npm i -g yarn &&  npm i -g gulp
#### 安装编译所有依赖
npm run bootstrap:all

### 项目根目录初始化lerna
lerna init

### 常用命令
- lerna init: 初始化项目
- lerna bootstrap: 自动构建项目依赖并建立软连接
- lerna link: 软连接本地依赖包
- lerna ls: 列出当前项目所有包
- lerna clean: 清理包下的node_modules文件
- lerna add: 添加依赖（类似npm install)
- lerna run: 按拓扑图运行
- lerna import: 导入已存在的multirepo项目到lerna管理的monorepo 保存git历史记录
- lerna publish: 发版到npm仓库

### 需要共享npm包可登录npm账号
- npm whoami
- npm login

### 设置yarn的workspaces模式
- 默认是npm, 而且每个子package都有自己的node_modules, 通过这样设置后, 只有顶层有一个node_modules
- package.json 文件加入
  "private": true,
  "workspaces": [
  "packages/*"
  ],

- lerna.json 文件加入
  "useWorkspaces": true,
  "npmClient": "yarn",

### 创建packages

cd packages
mkdir core common utils components
- 分别进入目录初始化包
  cd components
  yarn init -y or npm init -y

### 添加依赖关系

lerna add components --scope=app

本地调试或非npm包 引入如: "athena-components": "^1.0.0"
athena-components 为package.json内name名称 components为文件夹名称

### 初始化依赖 建立link软连接
- 默认是npm i,因为我们指定过yarn 使用yarn install, 会把所有包的依赖安装到根node_modules
  lerna bootstrap

### lerna publish
- 会打tag, 上传git, 上传npm。 如果包名是带scope的例如："name": "@my/app", 那需要在packages.json添加
  "publishConfig": {
  "access": "public"
  },               
