<template>
  <div class="qrpay">
    <div class="bg">
      <img style="width: 100%;height: auto;" mode="widthFix"
        src="https://wx2.sinaimg.cn/mw690/0070NSSfgy1hqwad3yetgj31e01e0dhl.jpg" alt="" />
    </div>
    <!-- https://wx2.sinaimg.cn/mw690/0070NSSfgy1hqwad9yxwsj30u00ts45l.jpg -->

    <div class="flex flex-column content">
      <div class="flex flex-column content-margin ">

        <div class="flex flex-row  header">

          <div class="flex flex-column align-items-center">
            <div class="count">{{ infoData.parkDurationText }}</div>
            <div class="count-tip">停车时长</div>
          </div>
          <div style="height: 30px;width: 1px;align-self: center;" class="line"></div>

          <div class="flex flex-column align-items-center">
            <div class="count">{{ infoData.needPay }}元</div>
            <div class="count-tip">停车金额</div>
          </div>
        </div>


        <div class="cate-title">基本信息</div>
        <div class="flex flex-column">
          <div v-for="(item, index) in infos" :key="index" style="margin: 0 10px;">
            <div class="flex flex-row item">
              <div class="item-title">{{ item.title }}</div>
              <IconFont :name="item.icon" v-if="item.icon" style="margin-right: 10px;color:#9496A5"
                @click="tipsClick(item)">
              </IconFont>
              <div class="item-value">{{ infoData[item.key] }}</div>

            </div>
            <div v-if="index < infos.length - 1" style="height: 0.5px;" class="line">
            </div>
          </div>
        </div>


        <!-- 优惠券  -->
        <div class="cate-title">优惠</div>
        <div class="flex flex-column">
          <div style="margin: 0 10px;">
            <div class="flex flex-row item">
              <div class="item-title">优惠券</div>
              <div class="item-value" style="color:#9496A5">请选择</div>
              <IconFont name="right" style="color:#9496A5"></IconFont>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 100px;"></div>
    </div>

    <div class="pay-bottom">
    
      
      <div class="pay-content flex flex-row">
        <div class="flex flex-column justify-content-center pay-price-container">
          <div class="pay-price">海滨三鹿停车场</div>
          <div class="pay-price-tip">订单详情</div>
        </div>
        <div style="flex: 1;"></div>
        <nut-button type="primary" class="pay-btn">支 付</nut-button>
      </div>

      <div class="bottom-tips ">
        24小时客服电话：400-86-10365 
    
      </div>
    </div>
  </div>
</template>
<script setup>
import './index.scss'
import { ref, reactive, onMounted } from 'vue'
import { IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
const infos = ref([
  {
    title: "车牌号",
    key: 'plateNo'
  },
  {
    title: "订单号",
    key: 'orderNo'
  },
  {
    title: "进场时间",
    key: 'enterTime',
    icon: 'tips'
  },
  {
    title: "出场时间",
    key: 'exitTime',
    icon: 'tips'
  }
])
const orderFees = ref([
  {
    title: "订单费用",
    key: 'totalCharge'
  },
  {
    title: "订单减免费用",
    key: 'reductionFee'
  },
  {
    title: "实际缴费",
    key: 'realCharge'
  }
])
const infoData = reactive({
  "parkId": 1,
  "orderNo": "AAAAA",
  "plateNo": "鲁L·B1582【蓝牌】",
  "plateType": 1,
  "plateTypeText": "蓝牌",
  "enterTime": "2024-02-07 00:00:00",
  "exitTime": "2024-02-07 00:00:00",
  "parkDuration": 46,
  "parkDurationText": "1小时44分",
  "totalCharge": 32,
  "reductionFee": 21,
  "realCharge": 11,
  "needPay": '99.99',
  "enterPictureUrl": "https://openpark-saas.ks3-cn-shanghai.ksyuncs.com/camera_data/371148/2024/04/11/2024041117031231725389.jpg",
  "exitPictureUrl": "https://openpark-saas.ks3-cn-shanghai.ksyuncs.com/camera_data/371148/2024/04/11/2024041117031231725389.jpg"
})

onMounted(() => {

})


const tipsClick = (item) => {
  if (item.key == 'enterTime') {
    previewImage(infoData.enterPictureUrl)
  } else if (item.key == 'exitTime') {
    previewImage(infoData.exitPictureUrl)
  }
}

const previewImage = (imageUrl) => {
  Taro.previewImage({
    urls: [imageUrl] // 需要预览的图片http链接列表
  })
}
</script>