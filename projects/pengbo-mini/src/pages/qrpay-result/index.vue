<template>
  <div class="flex flex-column qrpay-result align-items-center">
    <image src="@/assets/images/success.png" alt="" class="img" />
    <div class="title">支付成功!</div>
    <div class="sub-title">场内支付后请在15分钟内离场，超时重新计费。</div>
    <nut-button type="primary" @click="backHome">返回首页</nut-button>
  </div>
</template>

<script setup>
import Taro from '@tarojs/taro'
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