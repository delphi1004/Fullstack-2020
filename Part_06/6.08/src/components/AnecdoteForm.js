import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AddAnecdote = ({ setNotificationMessage }) => {

    const [anecdote, setAnecdote] = useState('')
    const dispatch = useDispatch()

    const handleAddAnecdote = (event) => {
        event.preventDefault()
        dispatch(newAnecdote(anecdote))
        setNotificationMessage(`${anecdote} added`)
        setAnecdote('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleAddAnecdote}>
                <div>
                    <input type="text" value={anecdote} onChange={(event) => setAnecdote(event.target.value)} />
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}

export default AddAnecdote