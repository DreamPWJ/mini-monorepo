<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script>
import { ref } from 'vue'
import './index.scss'
import { demoApi } from '@/api/demo/demo'

export default {
  setup () {
    const msg = ref('Hello world')
    return {
      msg
    }
  },

  onLoad() {
    console.log('onLoad')
  },

  onMount() {
    console.log('Taro多包复用示例')
    demoApi().then(res => {

    })
    /*    console.log(Pipe.hidePart('18863302302', 'phone'))
        console.log(CommonUtils.randomString(6, 12))
        console.log(Constant.PHONE_REGEX)
        console.log('校验结果: ' + Validate.email('123'))*/

  }
}
</script>
