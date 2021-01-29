import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { THEME } from '../../../theme'

export const AppLoader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={'large'} color={THEME.MAIN_COLOR} style={styles.indicator} />
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.BACKGROUND_COLOR,
    opacity: 0.9,
    zIndex: 1000
  },
  indicator: {
    opacity: 1
  }
})
