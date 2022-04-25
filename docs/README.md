## Docusaurus、Dumi、VuePress 等实现文档工具
## Gatsby 实现现代快速的静态网站 如官网、博客等
## Vercel、Netlify、Github Pages 等实现站点部署平台 Vercel国内访问CDN更快并提供多环境个人用户免费部署
## MicroApp、qiankun 等微前端方案 解决大型复杂项目的分治、不同技术栈和跨团队协作、旧项目升级改造等问题

### 初始化项目步骤
- 执行根目录bootstrap:all命令 初始化依赖和软连接
- 在projects项目业务包内启动具体项目开发

### 基础通用包和业务包实时调试
- 先执行根目录封装的命令 npm run build:all
- 后期优化可根据文件监听变化实时响应联调结果

### 项目提交规范
eslint --fix

### yarn镜像源
yarn config set registry https://registry.npm.taobao.org -g
