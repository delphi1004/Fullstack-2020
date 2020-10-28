import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AddAnecdote from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AddAnecdote />
      <AnecdoteList />
    </div>
  )
}

export default App