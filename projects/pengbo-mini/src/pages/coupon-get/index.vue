<template>
  <div class="coupon-get flex flex-column" @click="hideKeyboard">

    <div class="topm"></div>
    <CouponItem :data="couponInfo" v-if="couponInfo" />

    <div class="coupon-get-plate-add">
      <PlateAdd ref="plateAddRef" />
    </div>

    <nut-button type="primary" class="btn">立即领取</nut-button>
  </div>
</template>

<script setup>
import CouponItem from '@/components/CouponItem/CouponItem.vue'
import PlateAdd from '@/components/PlateAdd/PlateAdd.vue'
import './index.scss'
import { onMounted, ref } from 'vue'
import { couponInfoReq } from '@/api/coupon'

const plateAddRef = ref(null)

const couponInfo = ref(null)

onMounted(() => {
  getCouponInfo()

})

const getCouponInfo = async () => {
  const { data } = await couponInfoReq('2024073011154797684914')

  couponInfo.value = data.data

  console.log('data', data)
}

const hideKeyboard = () => {
  plateAddRef.value.hideKeyboard()
}
</script>
