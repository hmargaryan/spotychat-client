import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native'
import { THEME } from '../theme'
import placeholder from '../../assets/avatar-placeholder.png'
import { AppTextBlack } from './UI/texts/AppTextBlack'
import { AppTextBook } from './UI/texts/AppTextBook'

export const Chat = ({ onPress, avatar, name, message, disabled }) => {
  const Wrapper =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
  return (
    <Wrapper
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Image
        style={styles.avatar}
        source={avatar ? { uri: avatar } : placeholder}
      />
      <View style={styles.info}>
        <AppTextBlack style={styles.name}>{name}</AppTextBlack>
        <AppTextBook style={styles.message}>{message}</AppTextBook>
      </View>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    borderColor: THEME.SECOND_COLOR,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  info: {
    height: '100%',
    marginLeft: 20,
    justifyContent: 'center'
  },
  name: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5
  },
  message: {
    color: THEME.GREY,
    fontSize: 14
  }
})
