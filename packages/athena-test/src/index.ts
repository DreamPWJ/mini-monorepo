export { testHelloMonoRepo } from './test/test'
export { testHelloJSMonoRepo } from './test/testjs'

// @ts-ignore  不使用export default 会导致小程序启动报错
import TestDemoComponent from './components/demo/demo-component.vue'

export { TestDemoComponent }
