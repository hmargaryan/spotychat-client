import React from 'react'
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform
} from 'react-native'
import { AppTextBlack } from '../texts/AppTextBlack'

export const AppTextButton = ({ children, onPress, color, style }) => {
  const Wrapper =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
  return (
    <Wrapper onPress={onPress}>
      <AppTextBlack style={{ ...style, color }}>{children}</AppTextBlack>
    </Wrapper>
  )
}
