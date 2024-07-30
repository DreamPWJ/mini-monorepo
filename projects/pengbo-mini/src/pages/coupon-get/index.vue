<template>
  <div class="coupon-get flex flex-column" @click="hideKeyboard">

    <div class="topm"></div>
    <CouponItem />

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
import { ref } from 'vue'

const plateAddRef = ref(null)

const hideKeyboard = () => {
  plateAddRef.value.hideKeyboard()
}
</script>
