import React , {useState} from 'react'
import AnecdoteList from './components/AnecdoteList'
import AddAnecdote from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const setNotificationHandler = (message) => {
    setNotificationMessage(message)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification msg={notificationMessage} resetMessageHandler={setNotificationMessage} />
      <AddAnecdote setNotificationMessage={setNotificationHandler} />
      <AnecdoteList />
    </div>
  )
}

export default App