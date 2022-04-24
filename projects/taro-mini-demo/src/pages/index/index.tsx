import {Component} from 'react'
import {Text, View} from '@tarojs/components'
import './index.scss'
import {Pipe, Validate} from "athena-common";
import {CommonUtils} from "athena-utils";
import {Constant} from "athena-constants";
import {Demo} from "athena-components";

export default class Index extends Component {

  componentWillMount() {
  }

  componentDidMount() {
    console.log('Taro多包复用示例')
    console.log(Pipe.hidePart('18863302302', 'phone'))
    console.log(CommonUtils.randomString(6, 12))
    console.log(Constant.PHONE_REGEX)
    console.log('校验结果: ' + Validate.email('6666@qq.com'))
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
        <Demo text="Taro组件"></Demo>
      </View>
    )
  }
}
