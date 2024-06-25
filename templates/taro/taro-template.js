const fs = require('fs');
/**
 * @author 潘维吉
 * @date 2019-07-08
 * 函数function编程风格
 * 模版快速生成脚本,执行命令  node  taro-template.js
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
const pageTemplate = `import Taro, { useRouter, useState, useEffect, useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './${fileName}.scss';

/**
 * ${upperCamelCase(fileName)}页面
 */
const ${upperCamelCase(fileName)} = () => {
  const {params: {id}} = useRouter();
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("hooks")
    console.log(id);
  }, [])

  useDidShow(() => {
  })

  const onHandle = (data) => {
    console.log(data);
  }

  return (
    <View className='${fileName}'>
      <View onClick={() => onHandle(value)}>
        ${fileName}页面
      </View>
    </View>
  )

}

${upperCamelCase(fileName)}.config = {
    navigationBarTitleText: '${fileName}页面',
};

export default ${upperCamelCase(fileName)};
`;

/**
 * 组件模版
 */
const componentsTemplate = `import Taro, { useEffect } from '@tarojs/taro';
import { Button, View } from '@tarojs/components';
import './${fileName}.scss';

interface IProps {
  value: string;

  onHandle(data): void;
}

/**
 * ${upperCamelCase(fileName)}组件
 */
const ${upperCamelCase(fileName)} = (props: IProps) => {

  useEffect(() => {

  }, [])

  return (
    <View className='${fileName}'>
      ${fileName}组件
      {JSON.stringify(props)}
      <Button type='primary' onClick={() => {
        props.onHandle("我是子组件的值")
      }}>子组件向父组通讯</Button>
    </View>
  )
}

${upperCamelCase(fileName)}.defaultProps = {
  value: "默认值"
} as IProps;

${upperCamelCase(fileName)}.options = {
  addGlobalClass: true
};

export default ${upperCamelCase(fileName)};
`;

/**
 * scss文件模版
 */
const scssTemplate = `.${fileName} {

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
