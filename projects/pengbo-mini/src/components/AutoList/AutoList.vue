<template>
  <div>
    <nut-toast :type="state.toast.type" :title="state.toast.msg" v-model:visible="state.toast.show" />
    <scroll-view
      :refresherEnabled="pageData"
      :scroll-y="true"
      style="height: 100vh"
      :refresher-triggered="state.status === 'refreshing'"
      @scrolltolower="onScrollToLower"
      @refresherrefresh="onRefresherRefresh"
    >
      <template v-if="!pageData">
        <div class="flex flex-column align-items-center justify-content-center">
          <nut-empty description="当前没有数据可供显示。" v-if="state.status === 'idle'">
            <nut-button shape="square" type="primary" style="margin-top: 20px" size="mini" @click="onRefresherRefresh">
              重新加载
            </nut-button>
          </nut-empty>
          <template v-else>
            <Loading style="margin-top: 200px" />
            <div class="loading-text">加载中……</div>
          </template>
        </div>

      </template>

      <div class="flex flex-row align-items-center justify-content-center" v-else-if="state.status === 'loading'">
        <Loading />
        <div class="loading-text">加载中……</div>
      </div>

      <template v-else>
        <template v-for="(item,index) in pageData" :key="index">
          <slot name="content" :data="{item, index}"></slot>
        </template>
      </template>
      <div style="height: 30px"></div>
    </scroll-view>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive } from 'vue'
import { Loading } from '@nutui/icons-vue-taro'

const props = defineProps({
  request: {
    type: Function,
    default: async () => {
    }
  },
  pageConfig: {
    type: Object,
    default: {
      pageKey: 'page',
      sizeKey: 'pageSize'
    }
  }
})

const state = reactive({
  // idle loading refreshing
  status: 'idle',
  data: null,
  params: {
    [props.pageConfig.pageKey]: 1,
    [props.pageConfig.sizeKey]: 20
  },
  toast: {
    show: false,
    msg: null,
    type: 'success'
  }
})

// 数据列表
const pageData = computed(() => {
  return state.data?.data
})

onMounted(() => {
  onRefresherRefresh()
})

const onRefresherRefresh = async () => {
  await _request('refreshing')
}

const onScrollToLower = async () => {
  await _request('loading')
}
// 数据接口请求
const _request = async (status = 'idle') => {

  if (state.status !== 'idle') {
    return
  }

  if (state.data?.hasNextPage && status === 'loading') {
    return
  }

  state.status = status

  const data = {
    status: 'idle'
  }

  try {

    const tempParams = state.params

    tempParams[props.pageConfig.pageKey] = status === 'refresh' ?
      1 : tempParams[props.pageConfig.pageKey] + 1

    const res = await props.request(tempParams) || {}


    await wait(2000)

    if (res.code === 200) {
      // 成功了
      data.data = res.data
      // 页码增加
      data.params = tempParams
    } else {
      // 请求接口失败
      data.toast = {
        show: true,
        type: 'fail',
        msg: res.msg || '加载失败'
      }
    }

  } catch (e) {
    data.toast = {
      show: true,
      type: 'fail',
      msg: e.toString()
    }
  } finally {
    Object.assign(state, {
      ...state,
      ...data
    })
  }
}

const wait = (val) => {
  return new Promise(resolve => {
    setTimeout(resolve, val)
  })
}
</script>

<style>
.loading-text {
  font-size: 20px;
  margin-left: 10px;
}
</style>
