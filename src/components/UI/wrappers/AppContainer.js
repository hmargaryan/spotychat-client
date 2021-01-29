import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { THEME } from '../../../theme'

export const AppContainer = ({ children, style, safe = true }) => {
  const Wrapper = safe ? SafeAreaView : View
  return <Wrapper style={{ ...styles.default, ...style }}>{children}</Wrapper>
}

const styles = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: THEME.BACKGROUND_COLOR,
    paddingHorizontal: 20
  }
})
