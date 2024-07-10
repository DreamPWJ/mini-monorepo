<template>
  <view class="details flex justify-content-center align-items-center">
    <nut-button type="primary">{{ msg }}</nut-button>
  </view>
</template>

<script setup lang="ts">
import './details.scss'
import { ref } from 'vue'
import { useDidShow, useLoad } from '@tarojs/taro'
import { demoApi } from '@/api/demo/demo'

/**
 * 数据属性定义
 */
const msg = ref<string>('分包小程序页面')

useLoad(() => {
  getData(666)
})

useDidShow(() => {

})

/**
 * 函数方法
 */
const getData = (param) => {
  // Taro.navigateTo({ url: '/pages/details/details' })
  demoApi().then(res => {

  })
}

</script>
