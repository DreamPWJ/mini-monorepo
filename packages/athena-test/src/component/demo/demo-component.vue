<template>
  <view class="index">
    <text>{{ message }}</text>
  </view>
</template>

<script>

export default ({
  name: 'DemoVueComponent',
  props: {
    message: String
  },

  // 可以使用所有的 Vue 生命周期方法
  mounted() {

  },

  // onLoad
  onLoad() {

  },

  // onReady
  onReady() {
  },

  // 对应 onShow
  onShow() {
    console.log(this.message)
  },

  // 对应 onHide
  onHide() {
  },

  // 对应 onPullDownRefresh
  onPullDownRefresh() {
  },

  setup(props) {
    // 使用Composition API

  }
})
</script>

<style scoped>
/*每个页面公共css */
</style>
