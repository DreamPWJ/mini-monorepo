<template>
  <div class="CouponItem flex flex-row">

    <div class="flex flex-column coupon-info">
      <div class="logo-text">澎泊</div>
      <div class="park-name">蓝能停车场</div>
      <div class="coupon-value" :style="{color: couponItemTypeColor}">单次全免费</div>
      <div class="coupon-valid">失效日期：01/09/2023</div>

    </div>

    <div class="coupon-tag" :style="{backgroundColor: couponItemTypeColor}">
      <div class="content flex flex-column">
        50%
      </div>
      <div class="triangle"></div>
    </div>

  </div>

</template>
<script setup>
import './index.scss'
import { computed } from 'vue'

const couponItemTypeColor = computed(() => {
  return '#9f1de8'
})

</script>
