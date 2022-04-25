import {Component} from 'react'
import {Text, View} from '@tarojs/components'
import './index.scss'
import {Pipe, Validate} from "athena-common";
import {CommonUtils} from "athena-utils";
import {Constant} from "athena-constants";
import {Demo} from "athena-components";
import {demoApi} from "../../api/demo/demo";

export default class Index extends Component {

  componentWillMount() {
  }

  componentDidMount() {
    console.log('Taro多包复用示例')
    console.log(Pipe.hidePart('18863302302', 'phone'))
    console.log(CommonUtils.randomString(6, 12))
    console.log(Constant.PHONE_REGEX)
    console.log('校验结果: ' + Validate.email('123'))
    demoApi().then(res => {

    })

  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View className='index'>
        <Text className="primary">Hello Taro!</Text>
        <Demo text="Taro自定义组件"></Demo>
        {/*<WebView src='http://www.jxybkj.cn:8010/?leaguerId=5871741f86894f8a9ce11ceed3d43ec1#/home' />*/}
      </View>
    )
  }
}
