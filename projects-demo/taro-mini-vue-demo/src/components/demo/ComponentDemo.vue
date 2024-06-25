<template>
  <view>
    <text class="component-msg">{{ msg }}</text>
    <!--    <button class="primary-btn" @click="changeMessage">点击我改变消息</button>-->
  </view>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { useDidShow } from '@tarojs/taro'

// 使用ref定义响应式数据
const message = ref<string>('你好，Vue 3的世界！')

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
const changeMessage = (): void => {
  message.value = '消息已被TypeScript改变！'
}

</script>

<style>

.component-msg {
  color: #bd34fe;
}
</style>
