import React from 'react'
import {Text, View} from '@tarojs/components'

import './demo.css'

export interface DemoProps {
  text: string
}

const Demo: React.FC<DemoProps> = ({text}) => {
  return (
    <View className="demo">
      {text} <Text>666</Text>
    </View>
  )
}

export {Demo}
