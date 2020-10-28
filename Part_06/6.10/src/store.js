import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    anecdote: anecdoteReducer,
    notification: notificationReducer
})

const Store = createStore(
    reducer,
    composeWithDevTools()
)

console.log(Store)

export default Store