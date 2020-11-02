import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [selectedBlog, setSelectedBlog] = useState()

  const handleUpdateLikes = async (blog) => {

    const blogToUpdate = {
      author: blog.author,
      id: blog.id,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user
    }

    dispatch(updateBlog(blogToUpdate)).catch(exception => {
      dispatch(setNotification(exception.response.data.error))
    })
  }

  const handleRemove = async (blog) => {

    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog)).then(() => {
        dispatch(setNotification(`${blog.title} removed`))
      }).catch(exception => {
        dispatch(setNotification(exception.response.data.error))
      })
    }
  }

  const handleDetail = (id) => {

    if (selectedBlog === id) {
      setSelectedBlog(null)
    } else {
      setSelectedBlog(id)
    }
  }

  const ShowBlog = (blog) => {
    return (
      <div key={blog.id} style={blogStyle}>
        <h3 className='blog_title_author' style={{ display: 'inline-block' }}>{blog.title}, {blog.author}</h3>
        <button style={{ marginLeft: '10px' }} onClick={() => handleDetail(blog.id)}> {selectedBlog === blog.id ? 'hide' : 'view'}</button>
        {
          selectedBlog === blog.id &&
          <div>
            <h3>{blog.url}</h3>
            <h3>{blog.likes} <button onClick={() => handleUpdateLikes(blog)}>like</button></h3>
            <h3>{user.name}</h3>
            <button style={{ backgroundColor: 'lightblue', border: 'none' }} onClick={() => handleRemove(blog)}>remove</button>
          </div>
        }
      </div>
    )
  }

  return (
    <div>
      { blogs.map(blog => ShowBlog(blog))}
    </div>
  )
}

export default Blog
