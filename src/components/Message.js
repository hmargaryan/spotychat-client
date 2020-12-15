import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { THEME } from '../theme'
import { AppTextBook } from './UI/texts/AppTextBook'

export const Message = ({ text, to }) => {
  const align = to ? 'flex-end' : 'flex-start'
  return (
    <View style={{ ...styles.container, alignSelf: align }}>
      <AppTextBook style={styles.text}>{text}</AppTextBook>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.SECOND_COLOR,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
    minHeight: 40,
    maxWidth: '90%',
    borderRadius: 20
  },
  text: {
    fontSize: 18,
    color: THEME.GREY
  }
})
