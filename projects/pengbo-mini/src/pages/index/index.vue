<template>
  <div class='flex flex-row ad-bg fade-in fade-in-show'
       style='background-color: #fff;align-items: center;justify-content: center;'>
    <div class="flex flex-column">
      <div class="ad-info">
        <div class="ad-name" @click="toPay">澎泊云</div>
        <div class="ad-name-en">PENGBO CLOUD</div>
        <div class="detail">
          通过汲取2017年以来运营路内外停车的经验，深耕智慧停车行业场景，以解决停车运营痛点为基础，打造出包括智慧停车管理平台、智慧停车运营平台、车位管控设备、停车诱导系统等在内的智慧停车系列生态产品。
        </div>
        <div class="top20"></div>
        <div class="detail">
          2022年推出颠覆性路外封闭停车场管理平台“澎泊”，实现停车场云上管理，停车运营永远在线。
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
import Taro from '@tarojs/taro'

const toPay = () => {
  // Taro.navigateTo({
  //   url: '/pages/qrpay/index'
  // })
}

</script>

<style>
.ad-name {
  color: #333;
  font-size: 72px;
  font-weight: bold;
}

.ad-name-en {
  color: #333;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 40px;
}

.detail {
  color: #666;
  font-size: 34px;
  text-indent: 35px;
}

.num {
  color: #0a55e0;
  font-size: 38px;
  font-weight: bold;
  margin: 0;
}

.top20 {
  height: 20px;
}

.ad-bg {
  background-image: url('https://pengbocloud.com/img/ad_bg.cbeaf74f.png');
  overflow: auto;
  height: 100vh;
  width: 100vw;
  background-size: cover;
}

.ad-info {
  max-width: 600px;
  backdrop-filter: blur(52px);
  -webkit-backdrop-filter: blur(52px);
  padding: 80px 25px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.15);
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
  margin-bottom: 120px;
}
</style>
