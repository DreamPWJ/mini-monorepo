const fs = require('fs');

/**
 * @author 潘维吉
 * @date 2021-10-26
 * 代码模版快速生成脚本
 * 模版快速生成脚本,执行命令  node  antd-template.js
 */

// 传入的动态参数
const generateLocation = process.argv[2];
const author = process.argv[3];
const pageType = process.argv[4];
const pageStyle = process.argv[5];
const bizPageType = process.argv[6];
let fileName = process.argv[7];

let directoryName; //目录名称

if (fileName.startsWith("/")) {
  fileName = fileName.substring(1);
}

if (fileName.includes("/")) {
  const index = fileName.lastIndexOf("/") + 1;
  directoryName = fileName.substring(0, index);
  fileName = fileName.substring(index);
}

if (!fileName) {
  console.error('命令缺少参数: 生成的文件名必填');
  process.exit(0);
}

/**
 * 页面模版
 */
let pageTemplate = ""
try {
  const data = fs.readFileSync(`${process.cwd()}/antd/${bizPageType}.tsx`, 'utf8')
  pageTemplate = data.replace(new RegExp(upperCamelCase(bizPageType), "g"), upperCamelCase(fileName))
    .replace(`.css`, `.${pageStyle}`)
    .replace(`${bizPageType}`, `${fileName}`)
    .replace(`AUTHOR`, `${author}`)
    .replace(`DATE_TIME`, `${dateFormat("yyyy-MM-dd HH:mm", new Date())}`);
} catch (err) {
  console.error("读取页面模版失败: " + err)
}

/**
 * 组件模版
 */
const componentsTemplate = ``;

/**
 * 样式文件模版
 */
const styleTemplate = `.${fileName} {

}`;

/**
 * 根据路径生成相关模版
 */
const successColor = `\x1b[32m ✔ \x1b[0m`;

switch (pageType) {
  case 'page':
    //directory = directoryName ? `./src/pages/${directoryName}${fileName}` : `./src/pages/${fileName}`;
    directory = directoryName ? `${generateLocation}/${directoryName}${fileName}` : `${generateLocation}/${fileName}`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, {recursive: true}, (err) => {
        if (err) throw err;
      }); // mkdir递归自动创建多级路径
    }
    process.chdir(directory); // cd $1
    fs.writeFileSync(`${fileName}.tsx`, pageTemplate);
    fs.writeFileSync(`${fileName}.${pageStyle}`, styleTemplate);
    console.log(`页面模版 ${directory} 已创建${successColor}`);
    break;
  case 'component':
    break;
}

/**
 * 转大驼峰命名
 */
function upperCamelCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }

  const string = array.join(' ');

  if (string.includes("-")) {
    let re = /-(\w)/g;
    return string.replace(re, function (all, letter) {
      return letter.toUpperCase();
    });
  }
  return string;
}

/**
 * 时间格式化
 */
function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "y+": date.getFullYear().toString(),        // 年
    "M+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "m+": date.getMinutes().toString(),         // 分
    "s+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    }
  }
  return fmt;
}

process.exit(0);
