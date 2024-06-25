// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // 关闭HMR错误遮罩层
    hmr: {
      overlay: false
    }
  }
  // 其他配置项...
})
