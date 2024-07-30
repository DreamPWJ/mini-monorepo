<template>
  <div class="coupon-get flex flex-column" @click="hideKeyboard">

    <template v-if="errorMsg.length<=0 && !loading">

      <div class="topm"></div>
      <CouponItem :data="couponInfo" v-if="couponInfo" />

      <div class="coupon-get-plate-add">
        <PlateAdd ref="plateAddRef" />
      </div>

      <nut-button type="primary" class="btn" @click="submit">立即领取</nut-button>

    </template>

    <nut-empty :description="errorMsg" image="error" v-if="errorMsg.length > 0" class="empty">
      <nut-button type="primary" class="scanQRCode" @click="scanQRCode">重新扫码</nut-button>
    </nut-empty>
  </div>
</template>

<script setup>
import CouponItem from '@/components/CouponItem/CouponItem.vue'
import PlateAdd from '@/components/PlateAdd/PlateAdd.vue'
import './index.scss'
import { onMounted, ref } from 'vue'
import { applyCoupon, couponInfoReq } from '@/api/coupon'
import { enqueue } from '@athena-common'
import Taro from '@tarojs/taro'
import { CommonUtils } from '@athena-utils'

const plateAddRef = ref(null)
const errorMsg = ref('')
const couponInfo = ref(null)
const submitLoading = ref(false)
const couponCode = ref(null)
const loading = ref(true)

onMounted(() => {

  enqueue((next) => {
    next()
    const params = Taro.getCurrentInstance().router.params
    const q = (params || {}).q
    const url = decodeURIComponent(q)


    getCouponInfo(url)

  })

})

// 重新扫码，这里可以让后台重新识别一下
const scanQRCode = () => {
  Taro.scanCode({
    success: (res) => {
      errorMsg.value = ''

      getCouponInfo(res.result)
    }
  })

}

const getCouponInfo = async (url) => {

  const code = CommonUtils.parseUrlParams(url).code


  couponCode.value = code
  loading.value = true
  try {
    const { data } = await couponInfoReq(code)

    if (data.code !== 200) {
      errorMsg.value = data.msg

      return
    }
    couponInfo.value = data.data
    errorMsg.value = ''
  } catch (e) {
    errorMsg.value = '请求失败'

  } finally {
    loading.value = false
  }


}


const submit = async () => {

  const value = plateAddRef.value.getValue()


  if (!value) {
    await Taro.showToast({
      title: '请输入正确的车牌',
      icon: 'error',
      duration: 2000
    })

    return
  }

  submitLoading.value = true


  try {
    const data = await applyCoupon(value.plateNo, value.plateType, couponCode.value)

    if (data.data.code == 200) {

      // 查询到订单号 存到本地缓存里面下次可以取
      plateAddRef.value.putLocalPlateNo(value)

      // 领取成功 返回到首页

      Taro.redirectTo({
        url: '/pages/qrpay-result/index?title=领取成功!&subTitle=优惠券领取成功，请在出场时扫码订单选择。'
      })


    }

  } finally {
    submitLoading.value = false
  }


}

const hideKeyboard = () => {
  plateAddRef.value?.hideKeyboard()
}
</script>
