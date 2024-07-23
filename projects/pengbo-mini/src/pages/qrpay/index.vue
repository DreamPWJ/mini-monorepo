<template>
  <div class="qrpay">
    <div class="bg">
      <img style="width: 100%; height: auto" mode="widthFix"
        src="https://wx2.sinaimg.cn/mw690/0070NSSfgy1hqwad3yetgj31e01e0dhl.jpg" alt="" />
    </div>
    <!-- 订单详情区域 -->
    <div class="flex flex-column content">

      <div class="flex flex-column content-margin">
        <template v-if="!loading">
          <div class="flex flex-row header">
            <div class="flex flex-column align-items-center">
              <div class="count">{{ infoData.parkDurationText }}</div>
              <div class="count-tip">停车时长</div>
            </div>
            <div style="height: 30px; width: 1px; align-self: center" class="line"></div>

            <div class="flex flex-column align-items-center" @click="payFeeInfoClick">
              <div class="count">{{ infoData.needPay }}元</div>
              <div class="flex flex-row" style="align-items: center;">
                <div class="count-tip">停车金额</div>
                <IconFont name="tips" style="color: #9496a5">
                </IconFont>

              </div>
            </div>
          </div>

          <div class="cate-title">基本信息</div>
          <div class="flex flex-column">
            <div v-for="(item, index) in infos" :key="index" style="margin: 0 10px">
              <div class="flex flex-row item">
                <div class="item-title">{{ item.title }}</div>
                <IconFont :name="item.icon" v-if="item.icon" style="margin-right: 10px; color: #9496a5"
                  @click="tipsClick(item)">
                </IconFont>
                <div class="item-value">{{ infoData[item.key] }}</div>
                <div class="item-value" style="flex: none;" v-if="item.subKey">【{{ infoData[item.subKey] }}】</div>
              </div>
              <div v-if="index < infos.length - 1" style="height: 0.5px" class="line"></div>
            </div>
          </div>

          <!-- 优惠券  -->
          <div class="cate-title">优惠</div>
          <div class="flex flex-column">
            <div style="margin: 0 10px">
              <div class="flex flex-row item" @click="chooseCoupon">
                <div class="item-title">优惠券</div>
                <div class="item-value" style="color: #9496a5">请选择</div>
                <IconFont name="right" style="color: #9496a5"></IconFont>
              </div>
            </div>
          </div>
        </template>
        <div v-else class="skeleton">
          <div class="skeleton-picture" style="display: flex;justify-content: center;">
            <nut-skeleton width="250px" height="15px" title animated row="3" class="item"> </nut-skeleton>
            <nut-skeleton width="250px" height="15px" title animated row="23" class="item"> </nut-skeleton>
          </div>
          <nut-skeleton width="600rpx" height="80rpx" animated row="6"> </nut-skeleton>
        </div>
      </div>
      <div style="height: 100px"></div>




    </div>

    <!-- 底部的订单区域 -->
    <div class="pay-bottom" v-if="!loading">
      <div class="pay-content flex flex-row">
        <div class="flex flex-column justify-content-center pay-price-container">
          <div class="pay-price">{{ parkInfo.parkName }}</div>
          <div class="pay-price-tip">{{ parkInfo.gateName }}</div>
        </div>
        <div style="flex: 1"></div>
        <nut-button type="primary" class="pay-btn" :loading="payLoading" @click="pay">支 付</nut-button>
      </div>

      <div class="bottom-tips">24小时客服电话：{{ parkInfo.operationPhone }}</div>
    </div>

    <!-- 订单金额详情 弹窗 -->
    <nut-dialog no-cancel-btn title="金额详情" v-model:visible="orderFeeVisible">
      <div class="flex flex-column">
        <div v-for="(item, index) in payFeeInfos" :key="index" style="margin: 0 10px">
          <div class="flex flex-row item">
            <div class="item-title">{{ item.title }}</div>

            <div class="item-value">￥{{ infoData[item.key] }}</div>
          </div>
          <div v-if="index < infos.length - 1" style="height: 0.5px" class="line"></div>
        </div>
      </div>
    </nut-dialog>

  </div>
</template>
<script setup>
import './index.scss'
import { ref, reactive, onMounted } from 'vue'
import { IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { enqueue } from 'athena-common'
import { orderPay, orderInfo } from '@/api/pay'

const loading = ref(true)
const payLoading = ref(false)
const infos = ref([
  {
    title: '车牌号',
    key: 'plateNo',
    subKey: 'plateTypeText'
  },
  {
    title: '订单号',
    key: 'orderNo',
  },
  {
    title: '进场时间',
    key: 'enterTime',
    icon: 'tips',
  },
  {
    title: '出场时间',
    key: 'exitTime',
    icon: 'tips',
  },
])

const payFeeInfos = ref([
  {
    title: '总费用',
    key: 'totalCharge',
  },
  {
    title: '减免费用',
    key: 'reductionFee',
  },
  {
    title: '已交费用',
    key: 'realCharge',
  },

])

const infoData = reactive({})

const parkInfo = reactive({})
const orderFeeVisible = ref(false)

onMounted(() => {
  enqueue((next) => {
    next()

    loading.value = true
    orderInfo('awg9ipo3').then(res => {
      const data = res.data
      Object.assign(parkInfo, data.data.parkInfo)
      Object.assign(infoData, data.data.orderInfo)
      loading.value = false
    })
  })
})

const chooseCoupon = () => {
  Taro.showActionSheet({
    itemList: ['A', 'B', 'C'],
    success: function (res) {
      console.log(res.tapIndex)
    },
    fail: function (res) {
      console.log(res.errMsg)
    }
  })
}

const payFeeInfoClick = () => {
  orderFeeVisible.value = true
}

const pay = () => {
  payLoading.value = true
  orderPay({
    // 订单号
    orderNo: infoData.orderNo,
    // 优惠券ID
    couponId: '',
    // 1微信 支付宝
    userAgent: 1,
  }).then((res) => {
    const data = res.data.data
    Taro.requestOrderPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.packageValue,
      signType: data.signType,
      paySign: data.paySign,
      success: (payRes) => { },
      fail: (e) => {
        Taro.showToast({
          title: '支付取消',
          icon: 'error',
          duration: 2000
        })
        Taro.redirectTo({
          url: '/pages/qrpay-result/index'
        })
      },
      complete: () => {
        payLoading.value = false
      }
    })
  })

}

const tipsClick = (item) => {
  if (item.key == 'enterTime') {
    previewImage(infoData.enterPictureUrl)
  } else if (item.key == 'exitTime') {
    previewImage(infoData.exitPictureUrl)
  }
}

const previewImage = (imageUrl) => {
  Taro.previewImage({
    urls: [imageUrl], // 需要预览的图片http链接列表
  })
}
</script>
