<template>
  <view class="index-demo">
    <text class="msg">{{ msg }}</text>
    <ProjectComponentDemo msg="Hello Project VueComponentDemo1"></ProjectComponentDemo>
    <VueDemoComponent msg="Hello MonoRepo VueComponentDemo2"></VueDemoComponent>
    <IconFont name="add" color="#fa2c19" size="24" />
    <nut-button type="primary">NutUI小程序组件库</nut-button>
    <nut-cell title="日历" :desc="String(date)" @click="show = true" />
    <nut-calendar
      v-model:visible="show"
      :default-value="date"
      start-date="2022-01-11"
      end-date="2022-11-30"
      @close="show = false"
      @choose="choose"
    >
    </nut-calendar>
    <nut-skeleton width="250px" height="15px" animated row="3"></nut-skeleton>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import './index.scss'
import { testHelloMonoRepo } from 'athena-test'
import ProjectComponentDemo from '@/components/demo/ComponentDemo.vue'
import { CommonUtils } from 'athena-utils'
import { demoApi } from '@/api/demo/demo'
import { VueDemoComponent } from 'athena-components-vue'
import { Constant } from 'athena-constants'
import { Pipe, Validate } from 'athena-common'
import { useDidShow, useLoad } from '@tarojs/taro'
import { IconFont } from '@nutui/icons-vue-taro'

/**
 * 数据定义
 */
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
  console.log('Taro多包复用示例')
  testHelloMonoRepo()
  demoApi().then(res => {

  })

  console.log(CommonUtils.randomString(6, 12))
  console.log(Pipe.hidePart('18863302302', 'phone'))
  console.log(Constant.PHONE_REGEX)
  console.log('校验结果: ' + Validate.email('123'))

}

</script>
