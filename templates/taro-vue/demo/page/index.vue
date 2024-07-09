<template>
  <view class="index-demo">
    <text>{{ msg }}</text>
  </view>
</template>

<script setup lang="ts">
import './index.scss'
import { ref } from 'vue'
import { useDidShow, useLoad } from '@tarojs/taro'

/**
 * 数据属性定义
 */
const msg = ref<string>('小程序新页面模版')

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
