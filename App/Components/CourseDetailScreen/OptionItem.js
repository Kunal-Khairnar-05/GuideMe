import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function OptionItem({icon,value,size=18}) {
  return (
    <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:5,
        marginTop:5
    }}>
      <Ionicons name={icon} size={size} color="black" />
        <Text style={{
          fontFamily: "outfit-medium",fontSize:size
        }}>{value}</Text>
    </View>
  )
}