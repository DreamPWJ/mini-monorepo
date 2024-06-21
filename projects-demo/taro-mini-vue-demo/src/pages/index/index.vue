<template>
  <view class="index">
    <text>{{ msg }}</text>
    <DemoVueComponent message="Hello  DemoVueComponent " />
  </view>
</template>

<script>
import { ref } from 'vue'
import './index.css'
import DemoVueComponent from 'athena-test'

export default {
  components: {
    DemoVueComponent
  },

  setup() {
    const msg = ref('Hello world')
    return {
      msg
    }
  },

  onLoad() {
    console.log('Index onLoad')
  },

  onShow() {
    console.log('Taro多包复用示例')
    // testHelloMonoRepo()

    /*  demoApi().then(res => {

     })
       console.log(CommonUtils.randomString(6, 12))
       console.log(Pipe.hidePart('18863302302', 'phone'))
       console.log(Constant.PHONE_REGEX)
       console.log('校验结果: ' + Validate.email('123'))
   */
  }

}
</script>
