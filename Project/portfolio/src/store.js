import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import statusReducer from './reducer/statusReducer'

const reducer = combineReducers({
  systemStatus:statusReducer
})

const Store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default Store