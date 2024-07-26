<template>
  <view class="index">
    <text>{{ msg }}</text>
    <view>
      <text class="green">{{ apiData?.msg }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import './index.scss'
import { useDidShow, useLoad } from '@tarojs/taro'
import { CommonUtils } from '@athena-utils'


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
  // testHelloMonoRepo()
  // testHelloJSMonoRepo()
  /*  demoApi().then(res => {
      apiData.value = res.data
    })*/

  console.log(CommonUtils.randomString(6, 12))
  /*   console.log(Pipe.hidePart('18863302302', 'phone'))
     console.log(Constant.TOKEN_KEY)
     console.log('校验结果: ' + Validate.email('123'))*/

}

</script>
