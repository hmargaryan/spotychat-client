import React from 'react'
import { View, StyleSheet } from 'react-native'
import { THEME } from '../theme'
import { AppTextBlack } from './UI/texts/AppTextBlack'

export const Song = ({ children }) => {
  return (
    <View style={styles.container}>
      <AppTextBlack style={styles.name}>{children}</AppTextBlack>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    borderBottomColor: THEME.SECOND_COLOR,
    borderBottomWidth: 1
  },
  name: {
    fontSize: 18,
    color: '#fff'
  }
})
