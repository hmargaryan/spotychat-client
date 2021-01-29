import {
  CLEAR_USER_ERROR,
  FETCH_CHATS_ERROR,
  FETCH_CHATS_REQUEST,
  FETCH_CHATS_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS
} from './types'

const initialState = {
  isAuth: false,
  id: '',
  name: '',
  avatar: null,
  tracks: [],
  playlists: [],
  chats: [],
  loading: false,
  error: null
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false
      }
    case LOGIN_ERROR:
      return {
        ...initialState,
        error: action.payload,
        loading: false
      }
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
        isAuth: false,
        loading: false
      }
    case LOGOUT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_USER_SUCCESS:
      const { id, name, avatar, tracks, playlists } = action.payload
      return {
        ...state,
        id,
        name,
        avatar,
        tracks,
        playlists,
        loading: false
      }
    case FETCH_USER_ERROR:
      return {
        ...initialState,
        loading: false,
        error: action.payload
      }
    case FETCH_CHATS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload,
        loading: false
      }
    case FETCH_CHATS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_USER_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}
