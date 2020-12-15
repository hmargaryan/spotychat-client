import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../utils/axios'
import {
  CLEAR_USER_ERROR,
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS
} from '../types'

export const fetchUser = () => async dispatch => {
  try {
    dispatch({ type: FETCH_USER_REQUEST })
    const accessToken = await AsyncStorage.getItem('accessToken')
    const { data } = await axios.get('/users', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    dispatch({ type: FETCH_USER_SUCCESS, payload: data })
  } catch (e) {
    dispatch({ type: FETCH_USER_ERROR, payload: e.message })
  }
}

export const clearUserError = () => ({ type: CLEAR_USER_ERROR })
