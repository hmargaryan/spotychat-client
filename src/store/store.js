import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from './reducers/auth.reducer'
import { chatReducer } from './reducers/chat.reducer'
import { userReducer } from './reducers/user.reducer'

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
