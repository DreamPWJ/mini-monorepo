<template>
  <view class="pengbo-index">
    <text class="msg">{{ msg }}</text>
    <ProjectComponentDemo message="Hello Project VueComponentDemo"></ProjectComponentDemo>
    <VueDemoComponent message="Hello MonoRepo VueComponentDemo"></VueDemoComponent>
  </view>
</template>

<script>
import { ref } from 'vue'
import './index.scss'
import { testHelloMonoRepo } from 'athena-test'
import ProjectComponentDemo from '@/components/demo/component-demo.vue'
import { CommonUtils } from 'athena-utils'
import { demoApi } from '@/api/demo/demo'
import { VueDemoComponent } from 'athena-components-vue'
import { Constant } from 'athena-constants'
import { Pipe, Validate } from 'athena-common'

export default {
  components: {
    ProjectComponentDemo,
    VueDemoComponent
  },

  setup() {
    const msg = ref('Hello Taro Mini Pnpm MonoRepo')
    return {
      msg
    }
  },

  onLoad() {
    console.log('Index onLoad')
  },

  onShow() {
    this.testMonoRepo()

  },

  methods: {
    testMonoRepo() {
      console.log('Taro多包复用示例')
      testHelloMonoRepo()
      demoApi().then(res => {

      })

      console.log(CommonUtils.randomString(6, 12))
      console.log(Pipe.hidePart('18863302302', 'phone'))
      console.log(Constant.PHONE_REGEX)
      console.log('校验结果: ' + Validate.email('123'))

    }

  }

}
</script>
