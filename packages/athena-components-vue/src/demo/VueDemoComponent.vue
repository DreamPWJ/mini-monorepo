<template>
  <view>
    <text class="monorepo-text">{{ msg }}</text>
    <!-- <button @click="changeMessage">传出消息</button>-->
  </view>
</template>

<script setup>
import './vue-demo-component.css'

import { ref } from 'vue'
import { useDidShow } from '@tarojs/taro'

// 使用ref定义响应式数据
const message = ref('你好，Vue 3 MonoRepo组件的世界！')

const { msg, welcomeMessage = '默认欢迎语' } = defineProps({
  msg: String,
  welcomeMessage: {
    type: String,
    default: '默认欢迎语'
  }
})

useDidShow(() =>
  console.log(message.value)
)

// 方法也直接定义，自动暴露给模板
const changeMessage = () => {
  message.value = '消息已被Vue3改变！'
}

</script>

<style>

</style>
