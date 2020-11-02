import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import BlogService from '../services/blogs'

const NewBlogForm = ({ blogAddedHandler }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      }

      const addedBlog = await BlogService.addNewBlog(newBlog)
      delete addedBlog.user

      setTitle('')
      setAuthor('')
      setUrl('')
      blogAddedHandler(addedBlog)
      dispatch(setNotification(`a new blog  ${addedBlog.title} added`))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error))
    }
  }

  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <div>Title: <input id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)} /> </div>
        <div>Author: <input id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
        <div>Url: <input id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)} /></div>
        <button id='create-blog' type="submit">create</button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  blogAddedHandler: PropTypes.func.isRequired,
}

export default NewBlogForm