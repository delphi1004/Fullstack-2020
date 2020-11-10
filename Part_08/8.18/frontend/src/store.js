import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import userLoginReducer from './reducer/useLoggedInReducer'

const reducer = combineReducers({
  userLogin:userLoginReducer,
})

const Store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default Store