<template>
  <div class="flex flex-column inner-qrpay" @click="hideKeyboard">
    <PlateAdd ref="plateAddRef" />
    <nut-button type="primary" class="btn" @click="submit" :loading="submitLoading">下一步</nut-button>
  </div>
</template>
<script setup>
import './index.scss'
import PlateAdd from '@/components/PlateAdd/PlateAdd.vue'
import { onMounted, ref } from 'vue'
import Taro from '@tarojs/taro'
import { innerPayOrder } from '@/api/pay'
import { enqueue } from '@athena-common'
import { CommonUtils } from '@athena-utils'

const plateAddRef = ref(null)
const submitLoading = ref(false)
const parkCode = ref(null)

onMounted(() => {
  enqueue(next => {
    next()
    const q = (Taro.getCurrentInstance().router.params || {}).q
    const url = decodeURIComponent(q)
    const data = CommonUtils.parseUrlParams(url)
    // 获取码上的停车场编号
    parkCode.value = data.code || '3716262'


  })
})


const hideKeyboard = () => {
  plateAddRef.value.hideKeyboard()
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
    const data = await innerPayOrder(parkCode.value, value.plateNo, value.plateType)

    if (data.data.code === 200) {

      // 查询到订单号 存到本地缓存里面下次可以取
      plateAddRef.value.putLocalPlateNo(value)

      Taro.navigateTo({
        url: `/pages/qrpay/index?orderId=${data.data.data.orderId}`
      })
    }

  } finally {
    submitLoading.value = false
  }


}


</script>

