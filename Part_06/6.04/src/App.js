import React , {useState} from 'react'
import Anecdotes from './components/Anecdotes'
import AddAnecdote from './components/AddAnecdotes'
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
      <Anecdotes />
    </div>
  )
}

export default App