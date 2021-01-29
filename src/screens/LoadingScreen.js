import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AppContainer } from '../components/UI/AppContainer'
import { AppLoader } from '../components/UI/AppLoader'

export const LoadingScreen = () => {
  return (
    <AppContainer>
      <AppLoader />
    </AppContainer>
  )
}

const styles = StyleSheet.create({})
