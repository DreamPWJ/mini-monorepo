<template>
  <div class="custom-navbar" :style="{height: pxTransform(height), background: background}">
    <div :style="{ paddingTop: pxTransform(statusBarHeight) }">
      <view class="left" @click="handleLeftClick">
        <!-- 左侧内容，如返回按钮 -->
        <text v-if="showBack">返回</text>
      </view>
      <div class="title" :style="{color: color}">
        <!-- 标题内容 -->
        <slot name="title">{{ title }}</slot>
        <!--<text>{{ systemInfo?.statusBarHeight }}</text>-->
      </div>
      <view class="right" @click="handleRightClick">
        <!-- 右侧内容，如更多按钮 -->
        <slot name="right"></slot>
      </view>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Taro, { getEnv, getWindowInfo, pxTransform, useDidShow } from '@tarojs/taro'

let height = ref(0)
let statusBarHeight = ref(0)

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  showBack: {
    type: Boolean,
    default: true
  },
  background: {
    type: String,
    default: '#ffffff'
  },
  color: {
    type: String,
    default: '#000000'
  }
})

const emit = defineEmits(['leftClick', 'rightClick'])

useDidShow(() => {

  // 动态计算navbar状态栏信息
  const env = getEnv()
  const windowInfo = env === 'WEB' ? { statusBarHeight: 0 } : getWindowInfo()
  statusBarHeight.value = windowInfo.statusBarHeight || 0
  const navBarHeight = 44
  /** 安全区高度 + navbar高度 */
  height.value = statusBarHeight + navBarHeight
  console.log(statusBarHeight + navBarHeight)
  console.log(windowInfo)
})

const handleLeftClick = () => {
  Taro.navigateBack()
  //emit('leftClick')
}

const handleRightClick = () => {
  emit('rightClick')
}
</script>

<style lang="scss">
.custom-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

  .title {
    // font-weight: bolder;
  }
}


/* 根据需要添加其他样式 */
</style>
