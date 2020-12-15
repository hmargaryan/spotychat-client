import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../utils/axios'
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS
} from '../types'

export const login = code => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('accessToken')
    if (token) {
      dispatch({ type: LOGIN_SUCCESS })
      return
    }
    if (!code) {
      return
    }
    const { data } = await axios.get(`/auth?code=${code}`)
    const { accessToken } = data
    if (!accessToken) {
      throw new Error('Login error')
    }
    await AsyncStorage.setItem('accessToken', accessToken)
    dispatch({ type: LOGIN_SUCCESS })
  } catch (e) {
    dispatch({ type: LOGIN_ERROR, payload: e.message })
  }
}

export const logout = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('accessToken')
    dispatch({ type: LOGOUT_SUCCESS })
  } catch (e) {
    dispatch({ type: LOGOUT_ERROR, payload: e.message })
  }
}
