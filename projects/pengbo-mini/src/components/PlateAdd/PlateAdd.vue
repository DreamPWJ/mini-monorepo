<template>
  <div class="flex flex-column plate-add">
    <template v-if="mode == 'history'">
      <div class="title">使用过的车牌号</div>
      <div class="flex flex-row plate-type" style="flex-wrap: wrap;">
        <div class="item" :class="{ 'item-select': historyPlateIndexValue == index }"
             v-for="(item, index) in historyPlateNoList" :key="index" @click="changePlateHistoryType(index)">
          {{ item.plateNo }}
        </div>
      </div>
      <div class="flex flex-row">
        <div class="no-plate" @click="changeMode('new')">不在列表中？</div>
      </div>
    </template>
    <template v-else>
      <div class="title">车牌号码</div>
      <div style="align-self: center;">
        <PlateNoInput ref="plateNoInputRef" />
      </div>
      <div class="title">车牌类型</div>


      <nut-grid :border="false" :column-num="3" direction="horizontal">
        <nut-grid-item v-for="(item, index) in plateTypeList" :key="index">
          <div class="item" :class="{ 'item-select': plateTypeValue == item.value }" @click="changePlateType(item)"
          >{{ item.title }}
          </div>
        </nut-grid-item>
      </nut-grid>

      <!--      <div class="flex flex-row plate-type justify-content-center" style="flex-wrap: wrap;">-->
      <!--        <div class="item" :class="{ 'item-select': plateTypeValue == item.value }" @click="changePlateType(item)"-->
      <!--             v-for="(item, index) in plateTypeList" :key="index">{{ item.title }}-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="flex flex-row">
        <div class="no-plate" @click="changeMode('history')" v-if="historyPlateNoList.length > 0">使用过的车牌号</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref, toRaw } from 'vue'
import './index.scss'
import Taro from '@tarojs/taro'
import PlateNoInput from '@/components/PlateNoInput/PlateNoInput.vue'
import { getPlateType } from '@/api/pay'
import { enqueue } from '@athena-common'

const plateNoInputRef = ref(null)
const plateTypeValue = ref(-1)
const plateTypeList = ref([])
const historyPlateNoList = ref([])
const historyPlateIndexValue = ref(-1)
// history new
const mode = ref(null)

const SAVE_KEY = 'getLocalPlateNo'
const MAX_SAVE_LEN = 7

onMounted(() => {
  // plateNoInputRef.value.setValue('鲁DL00004')

  const list = getLocalPlateNo()

  historyPlateNoList.value = list
  mode.value = list.length > 0 ? 'history' : 'new'

  enqueue(next => {
    next()
    getPlateType().then(res => {
      plateTypeList.value = res
    })
  })


})

/**
 * 返回
 * [
 *  {
 *    plateNo:'',
 *    plateType: 1
 *  }
 * ]
 */
const getLocalPlateNo = () => {

  try {
    const value = Taro.getStorageSync(SAVE_KEY) || JSON.stringify([])


    const arr = JSON.parse(value)
    // 如果数组长度超过7，只保留前7个元素
    if (arr.length > MAX_SAVE_LEN) {
      return arr.slice(0, MAX_SAVE_LEN)
    }

    return arr
  } catch (error) {
    return []
  }
}
/**
 *
 * @param {*} plateInfo
 *  {
 *    plateNo: string,
 *    plateType: number
 *  }
 */
const putLocalPlateNo = (plateInfo) => {

  const arr = getLocalPlateNo()

  // 检查是否有重复
  const index = arr.findIndex(item =>
    item.plateNo === plateInfo.plateNo && item.plateType === plateInfo.plateType
  )

  if (index !== -1) {
    // 如果找到重复项，将其从原位置删除
    arr.splice(index, 1)
  }

  // 在数组开头添加新对象
  arr.unshift(plateInfo)

  // 如果数组长度超过7，只保留前7个元素
  if (arr.length > MAX_SAVE_LEN) {
    return arr.slice(0, MAX_SAVE_LEN)
  }


  Taro.setStorageSync(SAVE_KEY, JSON.stringify(arr))
}

const changeMode = val => {
  mode.value = val
}
const changePlateHistoryType = index => {
  historyPlateIndexValue.value = index
}

const changePlateType = item => {
  plateTypeValue.value = item.value
}

const hideKeyboard = () => {
  plateNoInputRef.value?.hideKeyboard()
}

// 获取当前组件选择的
const getValue = () => {
  if (mode.value == 'new') {
    const plateNo = plateNoInputRef.value.getValue()
    const plateType = plateTypeValue.value
    if (plateType >= 0 && plateNo.length >= 7) {
      return {
        plateNo,
        plateType
      }
    }
  } else {
    if (historyPlateIndexValue.value >= 0) {
      return toRaw(historyPlateNoList.value[historyPlateIndexValue.value])
    }
  }

  return null
}

defineExpose({ getLocalPlateNo, putLocalPlateNo, hideKeyboard, getValue })


</script>
