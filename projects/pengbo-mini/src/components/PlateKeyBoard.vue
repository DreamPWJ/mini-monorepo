<template>
  <div class="platekeyboard" v-if="show">
    <div class="content">
      <div class="flex flex-column" v-for="(item, index) in keys" :key="index">
        <div class="flex flex-row">
          <div class="item text" v-if="index == 3" @click="changeType(type)">{{ type == 0 ? 'ABC' : '省份' }}</div>
          <template v-for="(obj, index) in item">
            <div class="item" @click="onClick(obj)">{{ obj }}</div>
          </template>
          <div class="item text" v-if="index == 3" @click="onClick(-1)">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Taro from '@tarojs/taro'
import { ref, computed } from 'vue'

defineProps({
  show: {
    type: Boolean,
    value: false
  }
})

const emits = defineEmits(['onChange', 'onDel'])


const p = [
  ['京', '津', '渝', '沪', '冀', '晋', '辽', '吉', '黑', '苏'],
  ['浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '琼'],
  ['川', '贵', '云', '陕', '甘', '青', '蒙', '桂', '宁', '新'],
  ['藏', '使', '领', '警', '学', '港', '澳', '港']
];

const p1 = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];


// 0省份 1ABC
const type = ref(0)

const keys = computed(() => {
  return type.value == 0 ? p : p1
})

const changeType = (e) => {
  //Taro.vibrateShort()
  type.value = e == 0 ? 1 : 0

}
const onClick = (obj) => {
  //Taro.vibrateShort()
  if (obj == -1) {
    emits('onDel')
    return
  }
  emits('onChange', obj)
}



</script>

<style lang="scss">
.platekeyboard {
  background-color: #e6e7e9;
  position: fixed;
  width: 100%;
  bottom: 44px;

  left: 0;

  .content {
    margin: 20px 10px;
  }

  .item {
    flex: 1;
    margin: 4px 2px;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 26px 0;
    flex-shrink: 0;
    border-radius: 2px;
    background-color: white;
    box-shadow: 0px 3px 0 0 #939798;
    border-radius: 4px;
    flex-shrink: 0;
    color: #000;
    font-size: 28px;
  }

  .item:active {
    background-color: #858688;
  }
}</style>