import {
  FETCH_CHATS_ERROR,
  FETCH_CHATS_REQUEST,
  FETCH_CHATS_SUCCESS,
  UPDATE_MESSAGES
} from '../types'

const initialState = {
  chats: [],
  loading: false,
  error: null
}

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHATS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_CHATS_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: action.payload
      }
    case FETCH_CHATS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case UPDATE_MESSAGES:
      const chats = state.chats.map(c => {
        if (c._id === action.payload.chatId) {
          c.messages = [...c.messages, action.payload.message]
        }
        return c
      })
      return {
        ...state,
        chats
      }
    default:
      return state
  }
}
