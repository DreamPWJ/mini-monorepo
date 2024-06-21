<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const msg = ref('athena-components-vue')
    return {
      msg
    }
  },

  onLoad() {
    console.log('athena-components-vue')
  }

}
</script>

<style scoped>
/*每个页面公共css */
</style>
