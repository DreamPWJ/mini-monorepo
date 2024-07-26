<template>
  <view class="my flex justify-content-center align-items-center">
    {{ msg }}
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
const msg = ref<string>('我的页面')

useLoad(() => {

})

useDidShow(() => {

})

</script>
