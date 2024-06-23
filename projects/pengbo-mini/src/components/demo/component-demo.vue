<template>
  <view class="index">
    <text class="project-text">{{ message }}</text>
  </view>
</template>

<script>

export default {
  name: 'ProjectComponentDemo',
  props: {
    message: String
  },

  // 可以使用所有的 Vue 生命周期方法
  mounted() {
    console.log(this.message)
  },

  // onLoad
  onLoad() {

  },

  // onReady
  onReady() {

  },

  // 对应 onShow
  onShow() {

  },

  // 对应 onHide
  onHide() {
  },

  // 对应 onPullDownRefresh
  onPullDownRefresh() {
  },

  setup() {
    // 使用Composition API
  }
}
</script>

<style >

.project-text{
  color: #41d1ff;
}
</style>
