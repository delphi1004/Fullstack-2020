import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AddAnecdote from './components/AnecdoteForm'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AddAnecdote />
      <AnecdoteList />
    </div>
  )
}

export default App