import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../utils/axios'
import {
  CLEAR_USER_ERROR,
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  FETCH_CHATS_REQUEST,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_ERROR
} from './types'

export const fetchUser = () => async dispatch => {
  try {
    dispatch({ type: FETCH_USER_REQUEST })
    const accessToken = await AsyncStorage.getItem('accessToken')
    const { data } = await axios.get('/users/profile', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return dispatch({ type: FETCH_USER_SUCCESS, payload: data })
  } catch (e) {
    await AsyncStorage.removeItem('accessToken')
    return dispatch({ type: FETCH_USER_ERROR, payload: e.message })
  }
}

export const fetchChats = () => async dispatch => {
  try {
    dispatch({ type: FETCH_CHATS_REQUEST })
    const accessToken = await AsyncStorage.getItem('accessToken')
    const { data } = await axios.get('/chats', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return dispatch({ type: FETCH_CHATS_SUCCESS, payload: data })
  } catch (e) {
    await AsyncStorage.removeItem('accessToken')
    return dispatch({ type: FETCH_CHATS_ERROR, payload: e.message })
  }
}

export const login = code => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('accessToken')
    if (token) {
      return dispatch({ type: LOGIN_SUCCESS })
    }

    if (!code) {
      throw new Error('Invalid code')
    }
    const { data } = await axios.get(`/auth?code=${code}`)
    const { accessToken } = data
    if (!accessToken) {
      throw new Error('Login error')
    }

    await AsyncStorage.setItem('accessToken', accessToken)
    return dispatch({ type: LOGIN_SUCCESS })
  } catch (e) {
    return dispatch({ type: LOGIN_ERROR, payload: e.message })
  }
}

export const logout = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('accessToken')
    return dispatch({ type: LOGOUT_SUCCESS })
  } catch (e) {
    return dispatch({ type: LOGOUT_ERROR, payload: e.message })
  }
}

export const clearUserError = () => ({ type: CLEAR_USER_ERROR })
