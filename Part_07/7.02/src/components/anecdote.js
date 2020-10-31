import React from 'react'
import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(anecdote => anecdote.id === Number(id))

  console.log(anecdotes, id, anecdote)

  return (
    < div >
      <h2>{anecdote.content}</h2>
      <h3>{`has ${anecdote.votes} vote`}</h3>
      <h3>for more info see <a href={anecdote.info}>{anecdote.info}</a></h3>
    </div>
  )
}
export default Anecdote

