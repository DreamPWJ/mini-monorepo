<template>
  <CustomNavBar :title="'我的'" :showBack=false />
  <view class="my flex justify-content-center align-items-center">
    <nut-button class="animated fadeInUp green-bg white" @click="test('weixin-pay')">{{ msg }}</nut-button>
  </view>
</template>

<script setup lang="ts">
import 'athena-styles/animate.min.css'
import './my.scss'
import { ref } from 'vue'
import Taro, { useDidShow, useLoad } from '@tarojs/taro'
import { CommonUtils } from 'athena-utils'
import { createPay, weiXinLogin } from '@/api/demo/demo'
import { CustomNavBar } from 'athena-components-vue'

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
  weiXinLogin().then(res => {
    let payData = {
      'openId': res.data.data.userInfo.openId, 'total': 1,
      'outTradeNo': CommonUtils.randomString(10, 10), 'description': '澎泊云新版支付测试'
    }
    createPay(payData).then(res => {
      let result = res.data.data
      // https://docs.taro.zone/docs/apis/payment/requestPayment
      Taro.requestPayment({
        timeStamp: result.timeStamp,
        nonceStr: result.nonceStr,
        package: result.packageValue,
        signType: result.signType,
        paySign: result.paySign,
        success: function(res) {
        },
        fail: function(res) {
        }
      })
    })
  })

}

</script>
