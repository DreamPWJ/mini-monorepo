<template>
  <div class="qrpay">
    <template v-if="!loading">
      <!-- 停车场信息 -->
      <div class="banner">
        <image src="@/assets/images/qrpay_bg.png" class="qrpay_bg" />

        <div class="content flex flex-column">
          <div class="park-name">{{ parkInfo.parkName }}</div>
          <div class="order-number">订单号：{{ infoData.orderNo }}</div>
          <div class="flex flex-row">
            <div class="flex flex-row position">
              <image src="@/assets/images/qrpay_position.png" class="qrpay_position" />
              <div class="position-text">{{ parkInfo.gateName }}</div>
            </div>
          </div>

        </div>

      </div>

      <div class="fee-body">

        <div class="plate-info">
          <!-- 车牌信息 -->
          <div class="flex flex-row" style="align-items: center;">
            <image src="@/assets/images/qrpay_car.png" class="qrpay_car" />
            <div class="plate-no">{{ infoData.plateNo }}</div>
            <div class="plate-no-type">（{{ infoData.plateTypeText }}）</div>
          </div>

          <div class="park-duration">停车时长: {{ infoData.parkDurationText }}</div>
          <!-- 停车时长+停车金额 -->
          <div class="flex flex-row header">
            <div class="flex flex-column align-items-center" style="flex-shrink: 0;width: 49%;"
              @click="previewImage(infoData.enterPictureUrl)">
              <div class="count">{{ infoData.enterTime }}</div>
              <div class="flex flex-row" style="align-items: center;">
                <div class="count-tip">进场时间</div>
                <image src="@/assets/images/qrpay_img.png" class="qrpay_img" />

              </div>
            </div>
            <div style="align-self: center" class="line"></div>

            <div class="flex flex-column align-items-center" style="flex-shrink: 0;width: 49%;"
              @click="previewImage(infoData.exitPictureUrl)">
              <div class="count">{{ infoData.exitTime }}</div>
              <div class="flex flex-row" style="align-items: center;">
                <div class="count-tip">出场时间</div>
                <image src="@/assets/images/qrpay_img.png" class="qrpay_img" />

              </div>
            </div>
          </div>
          <div class="cate-title">优惠</div>
          <div class="flex flex-row cate-item">
            <div class="text" style="flex: 1;">优惠券</div>
            <div class="flex flex-row align-items-baseline">
              <div class="text">请选择</div>
              <image src="@/assets/images/qrpay_right.png" class="qrpay_right" />
            </div>
          </div>
        </div>
      </div>

      <!-- 底部的订单区域 -->
      <div class="pay-bottom">
        <div class="pay-content flex flex-row align-items-center">
          <div class="flex flex-row align-items-center" style="flex: 1" @click="payFeeInfoClick">
            <image src="@/assets/images/qrpay_info.png" class="qrpay_info" />
            <div class="price-tip">
              停车金额(元):
            </div>
            <div class="price">
              {{ infoData.needPay }}
            </div>
          </div>
          <nut-button color="#252525" type="primary" class="pay-btn" :loading="payLoading" @click="pay">支 付</nut-button>
        </div>

        <div class="bottom-tips">24小时客服电话：{{ parkInfo.operationPhone }}</div>
      </div>
    </template>


    <nut-empty :description="erroMsg" image="error" v-if="erroMsg.length > 0" class="empty">

      <nut-button type="primary" class="scanQRCode" @click="scanQRCode">重新扫码</nut-button>
    </nut-empty>


    <!-- 订单金额详情 弹窗 -->
    <nut-dialog no-cancel-btn title="金额详情" v-model:visible="orderFeeVisible">
      <div class="flex flex-column">
        <div v-for="(item, index) in payFeeInfos" :key="index" style="margin: 0 10px">
          <div class="flex flex-row item">
            <div class="item-title">{{ item.title }}</div>

            <div class="item-value">￥{{ infoData[item.key] }}</div>
          </div>
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
const erroMsg = ref('')



onMounted((options) => {


  enqueue((next) => {
    next()

    loading.value = true


    const q = (Taro.getCurrentInstance().router.params || {}).q
    const url = decodeURIComponent(q)

    getData(url)

  })
})

const getData = (url) => {

  const data = parseUrlParams(url)
 

  if (!data.code) {
    erroMsg.value = '请扫描正确的二维码！'
    return
  }

  orderInfo(data.code).then(res => {
    if (res.data.code == 200) {
      const data = res.data
      Object.assign(parkInfo, data.data.parkInfo)
      Object.assign(infoData, data.data.orderInfo)
      loading.value = false
    } else {
      erroMsg.value = '当前出口未检测到车辆！'
    }

  })
}

// 重新扫码，这里可以让后台重新识别一下
const scanQRCode = () => {
  Taro.scanCode({
    success: (res) => {
       erroMsg.value = ''
       getData(res.result)
    }
  })
}


const parseUrlParams = (url) => {
  const params = {};
  const regex = /[?&]([^=&#]+)=([^&#]*)/g;
  let match;

  while ((match = regex.exec(url)) !== null) {
    params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
  }

  return params;
}

const chooseCoupon = () => {
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
    userAgent: Taro.getEnv() == Taro.ENV_TYPE.WEAPP ? 1 : 0,
  }).then((res) => {
    const data = res.data.data
    Taro.requestOrderPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.packageValue,
      signType: data.signType,
      paySign: data.paySign,
      success: (payRes) => {
        Taro.redirectTo({
          url: '/pages/qrpay-result/index'
        })
      },
      fail: (e) => {
        Taro.showToast({
          title: '支付取消',
          icon: 'error',
          duration: 2000
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
