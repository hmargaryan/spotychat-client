import { View, StyleSheet, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import { useAuthRequest } from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import React, { useEffect } from 'react'
import { AppContainer } from '../components/UI/wrappers/AppContainer'
import { AppButton } from '../components/UI/buttons/AppButton'
import logo from '../../assets/logo.png'
import config from '../config/config'
import { login } from '../store/actions/auth.action'

WebBrowser.maybeCompleteAuthSession()

export const AuthScreen = () => {
  const dispatch = useDispatch()

  const [request, response, promptAsync] = useAuthRequest(
    config.AUTH_REQUEST_CONFIG,
    config.DISCOVERY
  )

  useEffect(() => {
    if (response?.type === 'success') {
      dispatch(login(response.params.code))
    }
  }, [response])

  return (
    <AppContainer style={styles.container}>
      <View></View>
      <Image style={styles.logo} source={logo} />
      <AppButton onPress={() => promptAsync()} disabled={!request}>
        login
      </AppButton>
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    height: 150,
    width: 150
  }
})
