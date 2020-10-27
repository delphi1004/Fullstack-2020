import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteNote } from '../reducers/anecdoteReducer'

const Note = ({ note, handleClick }) => {
    return (
        <li>
            <h3>{note.content} </h3>
            <h3>has {note.votes}
                <button onClick={handleClick}>vote</button>
            </h3>
        </li>
    )
}

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state)

    return (
        <ul>
            {notes.map(note =>
                <Note key={note.id} note={note} handleClick={() => dispatch(voteNote(note.id))} />
            )}
        </ul>
    )
}

export default Notes