<template>
  <div class="flex flex-column qrpay-result align-items-center">
    <image src="@/assets/images/success.png" alt="" class="img" />
    <div class="title">{{ tipMessage.title }}</div>
    <div class="sub-title">{{ tipMessage.subTitle }}</div>
    <nut-button type="primary" @click="backHome">返回首页</nut-button>

  </div>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { onMounted, reactive } from 'vue'


const tipMessage = reactive({
  title: '',
  subTitle: ''
})

onMounted(() => {

  const params = Taro.getCurrentInstance().router.params

  const title = params.title
  const subTitle = params.subTitle


  Object.assign(tipMessage, {
    title: title,
    subTitle: subTitle
  })


})

const backHome = () => {
  Taro.redirectTo({
    url: '/pages/index/index'
  })
}

</script>

<style lang="scss">
.qrpay-result {
  padding: 0px 20px;

  .img {
    width: 100px;
    height: 100px;
    margin-top: 200px;
  }

  .title {
    margin-top: 50px;
    font-size: 36px;
    font-weight: bold;
  }

  .sub-title {
    text-align: center;
    font-size: 26px;
    color: #9496A5;
    margin-top: 20px;
    margin-bottom: 60px;
  }
}
</style>
