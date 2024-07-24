<template>
  <div class="platekeyboard" v-if="show">
    <div class="content">
      <div class="flex flex-column" v-for="(item, index) in keys" :key="index">
        <div class="flex flex-row">
          <div class="item text" v-if="index == 3" @click.stop="changeType(type)">{{ type == 0 ? 'ABC' : '省份' }}</div>
          <template v-for="(obj, index) in item">
            <div class="item" @click.stop="onClick(obj)">{{ obj }}</div>
          </template>
          <div class="item text" v-if="index == 3" @click.stop="onClick(-1)">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Taro from '@tarojs/taro'
import { ref, computed } from 'vue'
import './index.scss'

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
  Taro.vibrateShort()
  type.value = e == 0 ? 1 : 0

}
const onClick = (obj) => {
  Taro.vibrateShort()
  if (obj == -1) {
    emits('onDel')
    return
  }
  emits('onChange', obj)
}



</script>

 