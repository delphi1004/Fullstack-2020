import React, { useState, useEffect } from 'react'
import Blog from './components/blog'
import blogService from './services/blogs'
import './App.css'
import LoginForm from './components/loginform'

const ShowNotificaitonMessage = ({ msg, resetMessageHandler }) => {

  if (msg === null) {
    return null
  }

  setTimeout(() => {
    resetMessageHandler(null)
  }, 3000);

  return (
    <div id='notification'>
      <h3>{msg}</h3>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    
  }, [])

  const setNotificationHandler = (message) => {
    setNotificationMessage(message)
  }

  const setUserHandler = (user) => {
    blogService.getUserBlog(user.id).then(blogs =>
      setBlogs(blogs)
    )
    setUser(user)
  }

  if (user === null) {
    return (
      <div>
        <ShowNotificaitonMessage msg={notificationMessage} resetMessageHandler={setNotificationMessage} />
        <LoginForm setUserHandler={setUserHandler} setNotificationMessage={setNotificationHandler} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3>{user.name} logged in</h3>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App