<template>
  <view class="my text-center">
    <nut-button class="animated fadeInUp green-bg white" @click="test('weixin-pay')">{{ msg }}</nut-button>
  </view>
</template>

<script setup lang="ts">
import 'athena-styles/animate.min.css'
import './my.scss'
import { ref } from 'vue'
import Taro, { useDidShow, useLoad } from '@tarojs/taro'

/**
 * 数据属性定义
 */
const msg = ref<string>('微信小程序支付')

useLoad(() => {

})

useDidShow(() => {

})

/**
 * 函数方法
 */
const test = (param) => {
  console.log(param)
  //Taro.navigateTo({ url: '/pages/details/details' })

  // https://docs.taro.zone/docs/apis/payment/requestPayment
  Taro.requestPayment({
    timeStamp: '',
    nonceStr: '',
    package: '', // 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
    signType: 'MD5',
    paySign: '',
    success: function(res) {
    },
    fail: function(res) {
    }
  })
}

</script>
