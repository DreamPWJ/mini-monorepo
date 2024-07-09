const fs = require('fs')
const exec = require('child_process').exec

/**
 * @author 潘维吉
 * @date 2019-07-08
 * Vue3 TypeScript编程风格的模版
 * 模版快速生成脚本, 执行命令  node taro-vue-template.js 或者IDEA内右键Run执行
 */

/**
 * 定义生成数据
 */
const projectPath = '../../projects/pengbo-mini/' // 项目路径 目录名称 用于生成模版到具体项目目录下
const type = 'page' // 生成页面类型  page 页面 component 组件 sub-package 子包页面
let fileName = 'home'  // 文件名称   process.argv[3]
let directoryName //目录名称

if (fileName.startsWith('/')) {
  fileName = fileName.substring(1)
}

if (fileName.includes('/')) {
  const index = fileName.lastIndexOf('/') + 1
  directoryName = fileName.substring(0, index)
  fileName = fileName.substring(index)
}

if ((type !== 'page' || type !== 'component' || type !== 'sub-package') && !fileName) {
  console.log('命令示例：npm run g  p(page) c(component) sub-p(sub-package-page) directoryName/fileName')
  process.exit(0)
}

/**
 * 页面模版
 */
const pageTemplate = `<template>
  <view class="${fileName}">
    <text>{{ msg }}</text>
  </view>
</template>

<script setup lang="ts">
import './${fileName}.scss'
import { ref } from 'vue'
import Taro, { useDidShow, useLoad } from '@tarojs/taro'

/**
 * 数据属性定义
 */
const msg = ref<string>('${fileName}小程序新页面模版')

useLoad(() => {

})

useDidShow(() => {

})

/**
 * 函数方法
 */
const test = (param) => {
  // Taro.navigateTo({ url: '/pages/details/details' })
}

</script>
`

/**
 * 组件模版
 */
const componentsTemplate = `
`

/**
 * scss文件模版
 */
const scssTemplate = `.${fileName} {

}`

/**
 * 小程序配置模版
 */
const miniConfigTemplate = `export default definePageConfig({
  navigationBarTitleText: '${fileName}'
})
`

/**
 * 根据路径生成相关模版
 */
const successColor = `\x1b[32m ✔ \x1b[0m`

switch (type) {
  case 'page':
    directory = directoryName ? `src/pages/${directoryName}${fileName}` : `src/pages/${fileName}`
    directory = projectPath + directory
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true }, (err) => {
        if (err) throw err
      }) // mkdir递归自动创建多级路径
    }
    process.chdir(directory) // cd $1
    fs.writeFileSync(`${fileName}.vue`, pageTemplate)
    fs.writeFileSync(`${fileName}.scss`, scssTemplate)
    fs.writeFileSync(`${fileName}.config.ts`, miniConfigTemplate)
    console.log(` 页面模版 ${directory} 已创建${successColor}`)
    // gitAdd(directory)
    break
  case 'component':
    directory = directoryName ? `src/components/${directoryName}${fileName}` : `src/components/${fileName}`
    directory = projectPath + directory
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true }, (err) => {
        if (err) throw err
      }) // mkdir递归自动创建多级路径
    }
    process.chdir(directory)
    fs.writeFileSync(`${fileName}.vue`, componentsTemplate)
    fs.writeFileSync(`${fileName}.scss`, scssTemplate)
    console.log(` 组件模版 ${directory} 已创建${successColor}`)
    break
  case 'sub-package':
    directory = directoryName ? `src/sub-package/pages/${directoryName}${fileName}` : `src/sub-package/pages/${fileName}`
    directory = projectPath + directory
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true }, (err) => {
        if (err) throw err
      }) // mkdir递归自动创建多级路径
    }
    process.chdir(directory) // cd $1
    fs.writeFileSync(`${fileName}.vue`, pageTemplate)
    fs.writeFileSync(`${fileName}.scss`, scssTemplate)
    fs.writeFileSync(`${fileName}.config.ts`, miniConfigTemplate)
    console.log(` 分包页面模版 ${directory} 已创建${successColor}
    `)
    break
}

/**
 * 大驼峰命名
 */
function upperCamelCase(str) {
  const array = str.toLowerCase().split(' ')
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length)
  }

  const string = array.join(' ')

  if (string.includes('-')) {
    let re = /-(\w)/g
    return string.replace(re, function(all, letter) {
      return letter.toUpperCase()
    })
  }
  return string
}

/**
 *  自动加入Git仓库管理
 */
function gitAdd(generateLocation) {
  exec(`cd ${generateLocation}/ && git add .`)
}

process.exit(0)
