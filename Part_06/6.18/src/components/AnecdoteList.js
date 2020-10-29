import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {

  return (
    <li>
      <h3>{anecdote.content} </h3>
      <h3>has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </h3>
    </li>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state =>
    state.anecdote.filter(anecdote =>
      anecdote.content.includes(filter)
    )
  )

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'` , 5))
  }

  return (
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => handleVote(anecdote)} />
      )}
    </ul>
  )
}

export default AnecdoteList