<template>
  <div>
    {{ plateNo }}
    <div class="flex flex-row plateNoInput">

      <template v-for="(item, index) in plateNo" :key="index">
        <div class="item" @click="onInput(index)"
          :class="{ 'item-select': (lastIndex < 0 ? 0 : lastIndex) == index && showKeyboard }">{{ item }}</div>
      </template>
      <div class="item new-energy" @click="newEnergyInput" :class="{ 'item-select': showKeyboardNewEnergy}">
        <template v-if="newEnergyCode.length > 0">
          <div  class="energy-text">{{ newEnergyCode }}</div>
        </template>
        <template v-else>
          <div class="add">+</div>
          <div>新能源</div>
        </template>
      </div>
    </div>
    <PlateKeyBoard :show="showKeyboard" @on-change="onKeyChange" @on-del="onKeyDel" />

    <PlateKeyBoard :show="showKeyboardNewEnergy" @on-change="onKeyChangeNewEnergy" @on-del="onKeyDelNewEnergy" />
  </div>
</template>

<script setup>
import PlateKeyBoard from './PlateKeyBoard.vue';

import { ref, computed } from 'vue'
const showKeyboard = ref(false)
const showKeyboardNewEnergy = ref(false)
const plateNo = ref(['', '', '', '', '', '', ''])
const newEnergyCode = ref('')

const lastIndex = computed(() => {

  const len = plateNo.value.length - 1
  for (let i = len; i >= 0; i--) {

    if (plateNo.value[i].length > 0) {
      return i
    }
  }
  return -1
})




const newEnergyInput = () => {
  showKeyboard.value = false
  showKeyboardNewEnergy.value = true
}

const onKeyChangeNewEnergy = (obj) => {
  newEnergyCode.value = obj
  showKeyboardNewEnergy.value = false
}
const onKeyDelNewEnergy = () => {
  newEnergyCode.value = ''

}


const onInput = () => {
  showKeyboardNewEnergy.value = false
  showKeyboard.value = true
}

const onKeyDel = () => {
  plateNo.value[lastIndex.value] = ''
}

const onKeyChange = (value) => {

  let index = lastIndex.value + 1

  if (index > plateNo.value.length - 1) {
    index = lastIndex.value
   
  }
  plateNo.value[index] = value

  if (index >= plateNo.value.length - 1) {
    showKeyboard.value = false
  }


}



</script>

<style lang="scss">
.plateNoInput {
  .item {
    height: 100px;
    width: 70px;
    background-color: #f7f7f7;
    border-radius: 8px;
    border: 1px solid transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    margin: 0 5px;
  }
  .energy-text{
    font-size: 36px;
  }

  .add {
    font-size: 32px;
    color: #9eb689;
    font-weight: bold;
  }

  .new-energy {
    background-color: #edf9e8;
    font-size: 18px;
  }

  .item-select {
    border: 2px solid var(--nut-primary-color);
  }
}
</style>