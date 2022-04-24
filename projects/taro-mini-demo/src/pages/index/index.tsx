import {Component} from 'react'
import {Text, View} from '@tarojs/components'
import './index.scss'
import {Pipe} from "athena-common";

export default class Index extends Component {

  componentWillMount() {
  }

  componentDidMount() {
    console.log(Pipe.hidePart(18863302302, "phone"));
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
        <Text>Hello Taro!</Text>
      </View>
    )
  }
}
