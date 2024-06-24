<template>
  <view class="demo">
    <view>
      欢迎使用 NutUI 开发 Taro 多端项目
      <Dongdong />
    </view>
    <view>{{ count }}</view>
    <view>
      <nut-button type="primary" @click="handleClick">
        Count++
      </nut-button>
    </view>
    <VueDemoComponent message="Hello MonoRepo VueComponentDemo"></VueDemoComponent>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { Dongdong } from '@nutui/icons-vue-taro'
import { VueDemoComponent } from 'athena-components-vue'

const count = ref(0)

const handleClick = () => {
  count.value++
}

</script>

<style>
.demo {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
