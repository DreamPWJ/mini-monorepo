<template>
  <div class="flex flex-column inner-qrpay" @click="hideKeyboard">
    <div class="title">车牌号码</div>
    <div style="align-self: center;">
      <PlateNoInput ref="plateNoInputRef" />
    </div>
    <div class="title">车牌类型</div>

    
    <div class="flex flex-row plate-type" style="flex-wrap: wrap;">

      <div class="item" :class="{'item-select': plateTypeValue == item.value}" @click="changePlateType(item)" v-for="(item, index) in plateTypeList" :key="index">{{item.title}}</div>

 
 
    </div>

    <nut-button type="primary" class="btn">下一步</nut-button>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import './index.scss' 
import PlateNoInput from '@/components/PlateNoInput/PlateNoInput.vue' 
import { getPlateType } from '@/api/pay'
const plateNoInputRef = ref(null)
const plateTypeValue = ref(-1)
const plateTypeList = ref([])

onMounted(()=>{ 
  // plateNoInputRef.value.setValue('鲁DL00004')

  getPlateType().then(res=> {

    plateTypeList.value = res
   
  })
})

const changePlateType = item => {
  plateTypeValue.value = item.value
}

const hideKeyboard = () => {
  plateNoInputRef.value?.hideKeyboard()
}
</script>

 