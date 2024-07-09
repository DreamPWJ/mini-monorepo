const fs = require("fs");
const exec = require('child_process').exec;

/**
 * @author 潘维吉
 * @date 2021-10-26
 * 自定义代码生成器  灵活、高效
 * 执行node code-generator.js 或者IDEA内右键Run执行
 * 可定义不同业务类型的模板
 * EJS高效的嵌入式 JavaScript 模板引擎 可根据参数动态生成差异性内容模板 https://ejs.co/
 */

// 生成文件目标位置
const generateLocation = `../projects/property-sales-admin/src/pages`;
// 作者名称
const author = "潘维吉";

/**
 * Ant Design of React中后台项目代码生成 参数如下
 */
const pageType = "page";  // 页面类型  1. page页面  2. component组件
const pageStyle = "less";  // 页面样式类型  1. css  2. scss  3. less   建议使用 tailwindcss
const bizPageType = "table";  // 业务页面类型  1. table表格  2. form表单

const fileName = "table-list";  // 文件名称  不含后缀   文件命名符合 kebabCase方式 如foo-bar 、 foo-bar.test-utils

exec(` node antd/antd-template.js ${generateLocation} ${author} ${pageType} ${pageStyle} ${bizPageType} ${fileName} `,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`代码生成执行异常: ${error}`);
      return;
    }
    console.log(`代码生成标准输出: ${stdout}`);
    // 自动加入Git仓库管理
    gitAdd()
    // 复制Git规范脚本到hooks中
    gitHooks()
    //console.log(`代码生成标准错误: ${stderr}`);
  });


/**
 * Ant Design Mobile of React移动端项目代码生成 参数如下
 */


/**
 *  自动加入Git仓库管理
 */
function gitAdd() {
  exec(`cd ${generateLocation}/${fileName} && git add .`)
}

/**
 *  复制Git规范脚本到hooks中
 */
function gitHooks() {
  fs.writeFileSync(`../.git/hooks/prepare-commit-msg`, fs.readFileSync(`../prepare-commit-msg`, 'utf8'));
}
