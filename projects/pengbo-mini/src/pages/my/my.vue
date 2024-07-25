<template>
  <view class="my flex justify-content-center align-items-center">
    <nut-button class="animated fadeInUp" type="primary">{{ msg }}</nut-button>
    <div class="card"></div>
  </view>
</template>

<script setup lang="ts">
import 'athena-styles/animate.min.css'
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