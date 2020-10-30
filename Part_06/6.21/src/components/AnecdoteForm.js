import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AddAnecdote = (props) => {

  const handleAddAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(anecdote)
    props.setNotification(`You added '${anecdote}'`, 5)
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

const mapDispatchToProps = {
  addAnecdote: addAnecdote,
  setNotification: setNotification
}

const ConnectedAddAnecdote = connect(null, mapDispatchToProps)(AddAnecdote)

export default ConnectedAddAnecdote
