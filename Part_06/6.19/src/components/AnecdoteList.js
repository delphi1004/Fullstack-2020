import React from 'react'
import { connect } from 'react-redux'
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

const AnecdoteList = (props) => {
  const handleVote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`You voted '${anecdote.content}'`, 5)
  }

  return (
    <ul>
      {props.anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => handleVote(anecdote)} />
      )}
    </ul>
  )
}

const mapDispatchToProps = {
  voteAnecdote: voteAnecdote,
  setNotification: setNotification
}

const mapStateToProps = (state) => {
  const anecdotes = state.anecdote.filter(anecdote =>
    anecdote.content.includes(state.filter)).sort((a, b) => b.votes - a.votes)

  return {
    anecdotes: anecdotes
  }
}

const ConnectedAnecdote = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdote