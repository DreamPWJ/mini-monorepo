import { createApp } from 'vue'

import 'athena-styles/base.css'
import 'athena-styles/variable.css'
import './app.scss'
import Taro from '@tarojs/taro'
import { enqueue } from 'athena-common'
import { login } from '@/api/demo/demo'

// 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
const App = createApp({

  async mounted() {
    console.log('App mounted.')

    Taro.setStorageSync('base_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjA0MDMwMTQsInN1YiI6IntcInVzZXJJZFwiOi0xfSIsImlzcyI6InBlbmdiby1wYXJrLWFwcCJ9.4CPG_ZZTcNo1E0H6pucfCNwc1HldNa-JwiKJREmj4rI')
    Taro.setStorageSync('token', null)
    enqueue(next => {

      this.next = next
      this.loginWithCode()
    })
  },

  methods: {
    loginWithCode() {
      Taro.showLoading({
        title: '加载中...'
      })

      Taro.login({
        success: (res) => {

          if (res.code) {
            login(res.code).then(res => {
              console.log(res)
              if (res.data.code == 200) {
                // 设置token 到本地
                Taro.setStorageSync('token', res.data.data.token)
                Taro.hideLoading()
                this.next()
              } else {
                this.reLoginTip(this)
              }
            }).catch(() => {
              Taro.hideLoading()
              this.reLoginTip(this)
            })
          } else {
            // 登录失败
            Taro.hideLoading()
            this.reLoginTip(this)
          }

        }
      })
    },

    reLoginTip(app) {
      console.log(app)
      Taro.showModal({
        content: '登录失败',
        title: '提示',
        success: (res) => {
          if (res.confirm) {
            app.loginWithCode()
          } else {
            // 退出
          }
        }
      })
    }
  }

})

export default App
