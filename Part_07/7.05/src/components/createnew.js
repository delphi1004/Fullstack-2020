import React from 'react'
import { useHistory } from 'react-router-dom'
import {useField} from './hooks'

const CreateNew = (props) => {
  const history = useHistory()
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: content.value,
      info: content.value,
      votes: 0
    })
    history.push('/')
    props.setNotification(`a new anecdote ${content.value} created!`)
  }

  const handleReset = () =>{
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input value = {content.value} type = {content.type} onChange = {content.onChange}/>
        </div>
        <div>
          author
          <input value = {author.value} type = {author.type} onChange = {author.onChange}/>
        </div>
        <div>
          url for more info
          <input value = {info.value} type = {info.type} onChange = {info.onChange}/>
        </div>
        <button type = 'submit'>create</button>
        <button type = 'button' onClick = {handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew