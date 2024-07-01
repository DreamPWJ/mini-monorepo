<template>
  <view class="navbar">
    <view class="left" @click="handleLeftClick">
      <!-- 左侧内容，如返回按钮 -->
      <text v-if="showBack">返回</text>
    </view>
    <view class="title">
      <!-- 标题内容 -->
      <slot name="title">{{ title }}</slot>
      <!--<text>{{ systemInfo?.statusBarHeight }}</text>-->
    </view>
    <view class="right" @click="handleRightClick">
      <!-- 右侧内容，如更多按钮 -->
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import Taro from '@tarojs/taro'

const systemInfo = ref(Taro.getSystemInfoSync())

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  showBack: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['leftClick', 'rightClick'])

const handleLeftClick = () => {
  Taro.navigateBack()
  //emit('leftClick')
}

const handleRightClick = () => {
  emit('rightClick')
}
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(220px + 44px); /* 考虑到状态栏高度 */
  padding: 0 15px;
  background-color: #ffffff;
}

.title {
  font-weight: bolder;
}

/* 根据需要添加其他样式 */
</style>
