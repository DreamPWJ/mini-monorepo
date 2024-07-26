<template>
  <div class="flex flex-column inner-qrpay" @click="hideKeyboard">
    <PlateAdd ref="plateAddRef" />
    <nut-button type="primary" class="btn" @click="submit">下一步</nut-button>
  </div>
</template>
<script setup>
import './index.scss'
import PlateAdd from '@/components/PlateAdd/PlateAdd.vue'
import { ref } from 'vue'
import Taro from '@tarojs/taro'

const plateAddRef = ref(null)


const hideKeyboard = () => {
  plateAddRef.value.hideKeyboard()
}

const submit = () => {
  const value = plateAddRef.value.getValue()

  if (!value) {
    Taro.showToast({
      title: '请输入正确的车牌',
      icon: 'error',
      duration: 2000
    })

    return
  }

  console.log('value', value)
}


</script>

 