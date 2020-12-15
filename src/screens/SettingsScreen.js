import React from 'react'
import { useDispatch } from 'react-redux'
import { AppButton } from '../components/UI/buttons/AppButton'
import { AppContainer } from '../components/UI/wrappers/AppContainer'
import { logout } from '../store/actions/auth.action'

export const SettingsScreen = () => {
  const dispatch = useDispatch()

  return (
    <AppContainer>
      <AppButton onPress={() => dispatch(logout())}>logout</AppButton>
    </AppContainer>
  )
}
