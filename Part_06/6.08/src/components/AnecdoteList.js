import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
    const anecdotes = useSelector(state => state)

    return (
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => dispatch(voteAnecdote(anecdote.id))} />
            )}
        </ul>
    )
}

export default AnecdoteList