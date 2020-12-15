import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS
} from '../types'

const initialState = {
  isAuth: false,
  error: null
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true
      }
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuth: false
      }
    case LOGOUT_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
