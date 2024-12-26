## VitePress、Docusaurus、Dumi等实现在线文档工具
## Gatsby 实现现代快速的静态网站 如官网、博客等
## Cloudflare Pages、Vercel、Netlify、Github Pages 等实现站点部署平台 Vercel国内访问CDN更快并提供多环境个人用户免费部署
## MicroApp、qiankun 等微前端方案 解决大型复杂项目的分治、不同技术栈和跨团队协作、旧项目升级改造等问题

#### 初始化项目步骤

- 执行根目录bootstrap:all命令 初始化依赖和软连接
- 在projects项目业务包内启动具体项目开发

#### 基础通用包和业务包实时调试

- 执行根目录封装的命令 npm run watch:ts
- 根据文件监听变化实时响应联调结果 tsc --watch 单独开启服务

#### 项目提交规范

eslint --fix


