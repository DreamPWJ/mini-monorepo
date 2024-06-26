<template>
  <view class="my">
    <nut-button type="primary">{{ msg }}</nut-button>
  </view>
</template>

<script setup lang="ts">
import './my.scss'
import { ref } from 'vue'
import { useDidShow, useLoad } from '@tarojs/taro'

/**
 * 数据属性定义
 */
const msg = ref<string>('我的小程序页面')

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
