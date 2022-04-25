import {Component} from 'react'
import './app.scss'
import {MiniApi} from "athena-common";

class App extends Component {

  componentDidMount() {
  }

  componentDidShow() {
    /* 延迟执行 减少初始化处理任务 加快启动速度 */
    setTimeout(() => {
      // 监听小程序版本更新
      MiniApi.checkForUpdate();
      // 监听网络状态变化
      MiniApi.networkStatusChange();
      // 同步获取系统信息
      MiniApi.getSystemInfo();

    }, 2000)
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
