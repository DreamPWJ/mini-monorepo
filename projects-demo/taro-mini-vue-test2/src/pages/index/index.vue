<template>
  <view class="index-demo">
    <view class="top-demo">
      <text class="msg">{{ msg }}</text>
      <ProjectComponentDemo msg="Hello Project VueComponentDemo1"></ProjectComponentDemo>
      <VueDemoComponent msg="Hello MonoRepo VueComponentDemo2"></VueDemoComponent>
      <!--      <view>
              <IconFont name="add" color="#4171ff" size="24" />
            </view>-->
      <view>
        <text class="green">{{ apiData?.msg }}</text>
      </view>
    </view>
    <!--    <nut-button type="primary" @click="toDetails()">NutUI小程序组件库</nut-button>
        <nut-cell title="选择日历组件" :desc="String(date)" @click="show = true" />
        <nut-calendar
          v-model:visible="show"
          :default-value="date"
          start-date="2024-01-11"
          end-date="2024-12-30"
          @close="show = false"
          @choose="choose"
        >
        </nut-calendar>-->
    <!-- <nut-skeleton width="250px" height="15px" animated row="3"></nut-skeleton> -->
    <!--    <image src="@/assets/images/default-avatar.png"></image>-->
  </view>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import './index.scss'
import { useDidShow, useLoad } from '@tarojs/taro'
import { CommonUtils } from '@athena-utils'
import { testHelloJSMonoRepo, testHelloMonoRepo } from '@athena-test'
import { demoApi } from '@/api/demo/demo'
import { Pipe, Validate } from '@athena-common'
import { Constant } from '@athena-constants'
import ProjectComponentDemo from '@/components/demo/ComponentDemo.vue'
import { VueDemoComponent } from '@athena-components-vue'


/**
 * 数据定义
 */
const msg = ref('Hello World')
const apiData = ref()


useLoad(() => {
  console.log('Index onLoad')
})

useDidShow(() =>
  testMonoRepo()
)

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
  console.log(Constant.TOKEN_KEY)
  console.log('校验结果: ' + Validate.email('123'))

}

</script>
