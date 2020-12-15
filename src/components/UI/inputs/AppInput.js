import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { THEME } from '../../../theme'

export const AppInput = ({
  style,
  placeholder,
  value,
  onChangeText,
  multiline = false
}) => {
  return (
    <TextInput
      style={{ ...styles.default, ...style }}
      placeholder={placeholder}
      multiline={multiline}
      value={value}
      onChangeText={onChangeText}
    />
  )
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: THEME.GREY,
    borderWidth: 1,
    paddingHorizontal: 15,
    fontFamily: 'Circular-Book'
  }
})
