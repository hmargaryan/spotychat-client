import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../utils/axios'
import {
  FETCH_CHATS_ERROR,
  FETCH_CHATS_REQUEST,
  FETCH_CHATS_SUCCESS,
  UPDATE_MESSAGES
} from '../types'
import { fetchUser } from './user.action'

export const fetchChats = () => async dispatch => {
  try {
    dispatch(fetchUser())
    dispatch({ type: FETCH_CHATS_REQUEST })
    const accessToken = await AsyncStorage.getItem('accessToken')
    const { data } = await axios.get('/chats', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    dispatch({ type: FETCH_CHATS_SUCCESS, payload: data })
  } catch (e) {
    dispatch({ type: FETCH_CHATS_ERROR, payload: e.message })
  }
}

export const updateMessages = (chatId, message) => ({
  type: UPDATE_MESSAGES,
  payload: { chatId, message }
})
