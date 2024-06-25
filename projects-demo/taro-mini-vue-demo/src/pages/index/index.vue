<template>
  <view class="index-demo">
    <text class="msg">{{ msg }}</text>
    <ProjectComponentDemo message="Hello Project VueComponentDemo"></ProjectComponentDemo>
    <VueDemoComponent message="Hello MonoRepo VueComponentDemo"></VueDemoComponent>
    <nut-button type="primary">NutUI小程序组件库</nut-button>
    <nut-skeleton width="250px" height="15px" animated row="3"></nut-skeleton>
    <!--    <IconFont name="add" color="#fa2c19" size="24"/>-->
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

/**
 * 数据定义
 */
const msg = ref('Hello Taro Mini Pnpm MonoRepo')

useLoad(() => {
  console.log('Index onLoad')
})

useDidShow(() =>
  testMonoRepo()
)

/**
 * 测试MonoRepo
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
