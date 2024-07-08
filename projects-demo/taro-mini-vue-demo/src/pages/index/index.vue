<template>
  <CustomNavBar :title="'首页'" :showBack=false />
  <view class="index-demo">
    <view class="top-demo">
      <text class="msg">{{ msg }}</text>
      <ProjectComponentDemo msg="Hello Project VueComponentDemo1"></ProjectComponentDemo>
      <VueDemoComponent msg="Hello MonoRepo VueComponentDemo2"></VueDemoComponent>
      <view>
        <IconFont name="add" color="#4171ff" size="24" />
      </view>
      <view>
        <text class="green">{{ apiData?.msg }}</text>
      </view>
    </view>
    <nut-button type="primary" @click="toDetails()">NutUI小程序组件库</nut-button>
    <nut-cell title="选择日历组件" :desc="String(date)" @click="show = true" />
    <nut-calendar
      v-model:visible="show"
      :default-value="date"
      start-date="2024-01-11"
      end-date="2024-12-30"
      @close="show = false"
      @choose="choose"
    >
    </nut-calendar>
    <!--    <nut-skeleton width="250px" height="15px" animated row="3"></nut-skeleton> -->
  </view>
</template>

<script setup lang="ts">
import './index.scss'
import { ref } from 'vue'
import Taro, { useDidShow, useLoad } from '@tarojs/taro'
import { testHelloJSMonoRepo, testHelloMonoRepo } from 'athena-test'
import ProjectComponentDemo from '@/components/demo/ComponentDemo.vue'
import { CommonUtils } from 'athena-utils'
import { demoApi } from '@/api/demo/demo'
import { CustomNavBar, VueDemoComponent } from 'athena-components-vue'
import { Constant } from 'athena-constants'
import { Pipe, Validate } from 'athena-common'
import { IconFont } from '@nutui/icons-vue-taro'

/**
 * 数据定义
 */
const apiData = ref()
const msg = ref<string>('Hello Taro Mini Pnpm MonoRepo')
const show = ref(false)
const date = ref('2024-06-01')

useLoad(() => {
  console.log('Index onLoad')
})

useDidShow(() =>
  testMonoRepo()
)

const choose = (param) => {
  date.value = param[3]
}

/**
 * 测试MonoRepo函数
 */
const testMonoRepo = () => {
  // Taro.navigateTo({ url: '/pages/details/details' })
  console.log('Taro多包复用示例')
  testHelloMonoRepo()
  testHelloJSMonoRepo()
  demoApi().then(res => {
    apiData.value = res.data
  })

  console.log(CommonUtils.randomString(6, 12))
  console.log(Pipe.hidePart('18863302302', 'phone'))
  console.log(Constant.PHONE_REGEX)
  console.log('校验结果: ' + Validate.email('123'))

}

/**
 * 导航到详情页
 */
const toDetails = () => {
  Taro.navigateTo({ url: '/sub-package/pages/details/details' })
}


</script>
