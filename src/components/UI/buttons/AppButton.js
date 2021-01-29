import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native'
import { THEME } from '../../../theme'
import { AppTextBlack } from '../texts/AppTextBlack'

export const AppButton = ({ children, onPress, disabled }) => {
  const Wrapper =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

  return (
    <Wrapper
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={styles.container}
    >
      <AppTextBlack style={styles.text}>{children}</AppTextBlack>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 55,
    borderRadius: 30,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: THEME.MAIN_COLOR,
    borderWidth: 3
  },
  text: {
    color: THEME.MAIN_COLOR,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 20
  }
})
