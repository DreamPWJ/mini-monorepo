const fs = require('fs');
/**
 * @author 潘维吉
 * @date 2019-07-08
 * 类class编程风格
 * 模版快速生成脚本,执行命令 node  taro-template-class.js
 */

const type = process.argv[2]; // p页面 c组件

let fileName = process.argv[3];
let directoryName; //目录名称

if (fileName.startsWith("/")) {
  fileName = fileName.substring(1);
}

if (fileName.includes("/")) {
  const index = fileName.lastIndexOf("/") + 1;
  directoryName = fileName.substring(0, index);
  fileName = fileName.substring(index);
}

if ((type !== 'p' || type !== 'c' || type !== 'sub-p') && !fileName) {
  console.log('命令示例：npm run g  p(page) c(component) sub-p(sub-package-page) directoryName/fileName');
  process.exit(0);
}

/**
 * 页面模版
 */
const pageTemplate = `import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './${fileName}.scss';

interface IStates {
}

/**
 * ${upperCamelCase(fileName)}页面
 */
export default class ${upperCamelCase(fileName)} extends Component<{}, IStates> {

  config = {
    navigationBarTitleText: '${fileName}',
  };

  state = {} as IStates;

  componentDidMount() {
  }

  componentDidShow() {
  }

  render() {
    return (
      <View className='${fileName}'>
        ${fileName}页面
      </View>
    )
  }
}`;

/**
 * 组件模版
 */
const componentsTemplate = `import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './${fileName}.scss';

interface IProps {
}

interface IStates {
}

/**
 * ${upperCamelCase(fileName)}组件
 */
export default class ${upperCamelCase(fileName)} extends Component<IProps, IStates> {

  static options = {
    addGlobalClass: true
  };

  static defaultProps = {} as IProps;

  state = {} as IStates;

  componentDidMount() {
  }

  render() {
    return (
      <View className='${fileName}'>
        ${fileName}组件
      </View>
    )
  }
}`;

/**
 * scss文件模版
 */
const scssTemplate = `/*postcss-pxtransform disable*/
.${fileName} {

}`;

/**
 * 根据路径生成相关模版
 */
const successColor = `\x1b[32m ✔ \x1b[0m`;

switch (type) {
  case 'p':
    directory = directoryName ? `./src/pages/${directoryName}${fileName}` : `./src/pages/${fileName}`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, {recursive: true}, (err) => {
        if (err) throw err;
      }); // mkdir递归自动创建多级路径
    }
    process.chdir(directory); // cd $1
    fs.writeFileSync(`${fileName}.tsx`, pageTemplate);
    fs.writeFileSync(`${fileName}.scss`, scssTemplate);
    console.log(` 页面模版 ${directory} 已创建${successColor}`);
    break;
  case 'c':
    directory = directoryName ? `./src/components/${directoryName}${fileName}` : `./src/components/${fileName}`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, {recursive: true}, (err) => {
        if (err) throw err;
      }); // mkdir递归自动创建多级路径
    }
    process.chdir(directory);
    fs.writeFileSync(`${fileName}.tsx`, componentsTemplate);
    fs.writeFileSync(`${fileName}.scss`, scssTemplate);
    console.log(` 组件模版 ${directory} 已创建${successColor}`);
    break;
  case 'sub-p':
    directory = directoryName ? `./src/sub-package/pages/${directoryName}${fileName}` : `./src/sub-package/pages/${fileName}`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, {recursive: true}, (err) => {
        if (err) throw err;
      }); // mkdir递归自动创建多级路径
    }
    process.chdir(directory); // cd $1
    fs.writeFileSync(`${fileName}.tsx`, pageTemplate);
    fs.writeFileSync(`${fileName}.scss`, scssTemplate);
    console.log(` 分包页面模版 ${directory} 已创建${successColor}
    `);
    break;
}

/**
 * 大驼峰命名
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

process.exit(0);
