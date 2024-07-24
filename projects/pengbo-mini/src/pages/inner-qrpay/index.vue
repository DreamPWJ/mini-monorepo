<template>
  <div class="flex flex-column inner-qrpay" @click="hideKeyboard">
    <div class="title">车牌号码</div>
    <div style="align-self: center;">
      <PlateNoInput ref="plateNoInputRef" />
    </div>
    <div class="title">车牌类型</div>

    
    <div class="flex flex-row plate-type" style="flex-wrap: wrap;">

      <div class="item">新能源</div>
      <div class="item">非标准车牌</div>
      <div class="item">使馆车</div>
      <div class="item item-select">蓝牌</div>
    </div>

    <nut-button type="primary" class="btn">保存</nut-button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import './index.scss' 
import PlateNoInput from '@/components/PlateNoInput/PlateNoInput.vue' 

const plateNoInputRef = ref(null)

const hideKeyboard = () => {
  plateNoInputRef.value?.hideKeyboard()
}
</script>

 