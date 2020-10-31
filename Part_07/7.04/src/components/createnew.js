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

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateNew