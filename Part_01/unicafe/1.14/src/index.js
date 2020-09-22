import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const DisplayAnecdote = ({selected,voteCount}) =>{
  return(
    <div>
      <h2>{anecdotes[selected]}</h2>
      <h3>has {voteCount} voted</h3>
    </div>
  )
}

const DisplayMostVotes = ({vote}) =>{
  let mostVotes = vote.indexOf(Math.max(...vote))
  return(
    <div>
      <DisplayAnecdote selected = {mostVotes} voteCount = {vote[mostVotes]}/>
    </div>
  )
}

const App = (props) => {
  const initValue = new Array(6).fill(0)
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(initValue)
  const incVote = () =>{
    const copy = [...vote]
    copy[selected]++
    return copy;
  }

  console.log(vote)

  return (
    <div>
      <DisplayAnecdote selected = {selected} voteCount = {vote[selected]} />
      <button onClick = {() => setVote(incVote())}>vote</button>
      <button onClick = {() => setSelected(Math.floor(Math.random() * 6))}>new anecdote</button>
      <DisplayMostVotes vote = {vote} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)