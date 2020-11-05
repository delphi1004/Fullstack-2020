import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { withStyles } from '@material-ui/core/styles'
import MuiTextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

const TextField = withStyles({
  root: {
    borderBottom: 'none',
    marginLeft: 10,
  }
})(MuiTextField)

const NewBlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    setTitle('')
    setAuthor('')
    setUrl('')

    dispatch(addBlog(newBlog)).then(() => {
      dispatch(setNotification(`a new blog  ${newBlog.title} added`))
    }).catch(exception => {
      dispatch(setNotification(exception.response.data.error))
    })
  }

  return (
    <div >
      <form style={{ marginTop: 30 }} onSubmit={handleNewBlog} >
        <TextField style={{ width: 400 }}
          required id='standard-required'
          label='title'
          value={title} onChange={({ target }) => setTitle(target.value)}
        />
        <TextField style={{ width: 250 }}
          id='standard-required'
          label='author'
          value={author} onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        <TextField style={{ width: 660 }}
          id='standard-required'
          label='url'
          value={url} onChange={({ target }) => setUrl(target.value)}
        />
        <IconButton type='submit' aria-label='add'>
          <AddIcon />
        </IconButton>
      </form>

    </div>
  )
}





export default NewBlogForm