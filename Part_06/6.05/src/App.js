import React from 'react'
import Anecdotes from './components/Anecdotes'
import AddAnecdote from './components/AddAnecdotes'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AddAnecdote/>
      <Anecdotes />
    </div>
  )
}

export default App