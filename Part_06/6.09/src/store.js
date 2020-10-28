import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/anecdoteReducer'

const Store = createStore(
    reducer,
    composeWithDevTools()
)

export default Store