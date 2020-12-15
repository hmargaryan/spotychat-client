import {
  CLEAR_USER_ERROR,
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS
} from '../types'

const initialState = {
  id: '',
  name: '',
  avatar: null,
  songs: [],
  playlists: [],
  loading: false,
  error: null
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        avatar: action.payload.avatar,
        songs: action.payload.songs,
        playlists: action.payload.playlists,
        loading: false
      }
    case FETCH_USER_ERROR:
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
