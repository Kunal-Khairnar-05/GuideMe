import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'

export default function SubHeading({text,color=Colors.WHITE}) {
  return (
    <View>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:24,
        marginLeft:20,
        marginBottom:20,
        color:color
    }}>{text}</Text>
    </View>
  )
}