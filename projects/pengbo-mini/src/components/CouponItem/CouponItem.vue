<template>
  <div class="CouponItem flex flex-row">
    <image src="@/assets/images/coupon_bg.png" class="coupon-bg" />
    <div class="coupon-content flex flex-row">
      <div class="flex flex-column left align-items-center">

        <div class="coupon-left">
          <div class="coupon-type">{{ couponItemType.title }}</div>
          <div class="coupon-value">{{ couponItemType.value }}</div>
        </div>
      </div>

      <div class="flex flex-column align-items-center justify-content-center right">
        <div class="coupon-valid ">{{ data.parkName }}</div>
        <div class="title">优惠券</div>
        <div class="coupon-valid">{{ couponItemType.couponValid }}</div>
      </div>

    </div>

  </div>

</template>
<script setup>
import './index.scss'
import { computed } from 'vue'

const props = defineProps({
  data: {

    type: Object,
    default: {}

  }
})


const couponItemType = computed(() => {


  /**
   *
   couponType	优惠规则：1:定额减免,2:时长减免,3:打折减免,4:单次减免,5:多次减免
   ParkCouponRuleVO
   amount	减免金额
   duration	减免时长
   discount	减免折扣,0~1之间
   day	免费天数
   time	免费到指定时间
   expireHours	有效时限
   */
  const item = props.data || {}


  return {
    title: item.rule.description.title,
    value: item.rule.description.value,
    couponValid: item.rule.description.couponValid
  }
})

const formatValidHours = (val) => {
  if (rule.validHours < 0) {
    return `长期有效`
  } else {
    return `${rule.validHours}小时内有效`
  }
}

</script>
