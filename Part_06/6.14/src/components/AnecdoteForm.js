import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AddAnecdote = () => {
  const dispatch = useDispatch()

  const handleAddAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    const addedAnecdote = await anecdoteService.addAnecdote(anecdote)
    dispatch(newAnecdote(addedAnecdote))
    dispatch(setNotification(`You added '${anecdote}'`))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name="anecdote" />
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default AddAnecdote