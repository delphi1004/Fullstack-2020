import React, { useState, useEffect } from 'react'
import Blog from './components/blog'
import BlogService from './services/blogs'
import './App.css'
import LoginForm from './components/loginform'
import NewBlogForm from './components/newblogform'

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      BlogService.setToken(user.token)
      userLoggedinHandler(user)
    }
  }, [])

  const setNotificationHandler = (message) => {
    setNotificationMessage(message)
  }

  const userLoggedinHandler = async (user) => {
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )

    setUser(user)
    BlogService.setToken(user.token)
    const blogs = await BlogService.getUserBlog(user.id)
    setBlogs(blogs)
  }

  const blogAddedHandler = (blog) =>{
    setBlogs(blogs.concat(blog))
  }

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.clear()
  }

  if (user === null) {
    return (
      <div>
        <ShowNotificaitonMessage msg={notificationMessage} resetMessageHandler={setNotificationMessage} />
        <LoginForm userLoggedinHandler={userLoggedinHandler} setNotificationMessage={setNotificationHandler} />
      </div>
    )
  }

  return (
    <div>
      <ShowNotificaitonMessage msg={notificationMessage} resetMessageHandler={setNotificationMessage} />
      <h2>blogs</h2>
      <h3>{user.name} logged in <button onClick={logoutHandler}>logout</button></h3>
      <NewBlogForm blogAddedHandler = {blogAddedHandler} setNotificationMessage={setNotificationHandler}/>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App