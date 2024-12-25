import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import { testHelloJSMonoRepo, testHelloMonoRepo } from 'athena-test'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
    testHelloMonoRepo()
    testHelloJSMonoRepo()
  })

  return (
    <View className="index">
      <Text>Hello World!</Text>
    </View>
  )
}
