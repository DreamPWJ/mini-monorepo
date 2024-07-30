<template>
  <div class="CouponItem flex flex-row">
    <image src="@/assets/images/coupon_bg.png" class="coupon-bg" />
    <div class="coupon-content flex flex-row">
      <div class="flex flex-column left align-items-center">
        <div class="coupon-type">固定金额</div>
        <div class="coupon-value">50分</div>
      </div>

      <div class="flex flex-column align-items-center justify-content-center right">
        <div class="coupon-valid ">澎泊云 蓝能停车场</div>
        <div class="title">优惠券</div>
        <div class="coupon-valid">有效日期:12/12/2023</div>
      </div>

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
