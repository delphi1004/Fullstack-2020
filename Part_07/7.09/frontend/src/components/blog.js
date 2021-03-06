import React, { useState } from 'react'
import BlogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, blogUpdatedHandler, blogRemovedHandler, user }) => {
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetail, setShowDetail] = useState(false)

  const handleUpdate = async (blog) => {

    const blogToUpdate = {
      author: blog.author,
      id: blog.id,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user
    }

    try {
      const updatedBlog = await BlogService.updateBlog(blogToUpdate)
      blogUpdatedHandler(updatedBlog)
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error))
    }
  }

  const handleRemove = async (blog) => {

    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      try {
        await BlogService.removeBlog(blog)
        dispatch(setNotification(`${blog.title} removed`))
        blogRemovedHandler(blog)
      } catch (exception) {
        dispatch(setNotification(exception.response.data.error))
      }
    }
  }

  return (
    <div style={blogStyle}>
      <h3 className='blog_title_author' style={{ display: 'inline-block' }}>{blog.title}, {blog.author}</h3>
      <button style={{ marginLeft: '10px' }} onClick={() => setShowDetail(!showDetail)}> {showDetail ? 'hide' : 'view'}</button>

      {showDetail &&
        <div>
          <h3>{blog.url}</h3>
          <h3>{blog.likes} <button onClick={() => handleUpdate(blog)}>like</button></h3>
          <h3>{user}</h3>
          <button style={{ backgroundColor: 'lightblue', border: 'none' }} onClick={() => handleRemove(blog)}>remove</button>
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogUpdatedHandler: PropTypes.func.isRequired,
  blogRemovedHandler: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
}

export default Blog
