import { createApp } from 'vue'
import './app.css'

const App = createApp({
  // 对应 onLaunch
  onLaunch() {
  },

  onShow(options) {
    console.log('App onShow.')
  },

  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    //return h('block', this.$slots.default)
  }
})

export default App
