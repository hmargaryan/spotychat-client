import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export const AppIconButton = ({ onPress, name, size, color, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  )
}
