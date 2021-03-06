import React, { useEffect } from 'react'
import { initializeAnecdote } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AddAnecdote from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdote())
  }, [dispatch])

  const anecdotes = useSelector(state => state.anecdote)

  anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AddAnecdote />
      <Filter />
      <AnecdoteList />
    </div>
  )
}

export default App