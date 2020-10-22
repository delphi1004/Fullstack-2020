import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/blog'
import BlogService from './services/blogs'
import './App.css'
import LoginForm from './components/loginform'
import NewBlogForm from './components/newblogform'
import Togglabel from './components/togglabel'

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
  const togglabelRef = useRef()

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
    blogs.sort( (a,b) => b.likes - a.likes)
    setBlogs(blogs)
  }

  const blogAddedHandler = (blog) => {
    setBlogs(blogs.concat(blog))
    togglabelRef.current.toggleVisibility()
  }

  const blogUpdatedHandler = (updatedBlog) =>{
    const index = blogs.findIndex(blog => blog.id === updatedBlog.id)
    blogs.splice(index, 1,updatedBlog)
    blogs.sort( (a,b) => b.likes - a.likes)
    setBlogs(blogs.map(blog => blog))
  }

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const UserLoginForm = () => (
    <Togglabel buttonLabel='login'>
      <LoginForm userLoggedinHandler={userLoggedinHandler} setNotificationMessage={setNotificationHandler} />
    </Togglabel>
  )

  const AddBlogForm = () => (
    <Togglabel buttonLabel='new blog' ref={togglabelRef}>
      <NewBlogForm blogAddedHandler={blogAddedHandler} setNotificationMessage={setNotificationHandler} />
    </Togglabel>
  )

  if (user === null) {
    return (
      <div>
        <ShowNotificaitonMessage msg={notificationMessage} resetMessageHandler={setNotificationMessage} />
        <h2>Blogs</h2>
        <UserLoginForm />
      </div>
    )
  }

  return (
    <div>
      <ShowNotificaitonMessage msg={notificationMessage} resetMessageHandler={setNotificationMessage} />
      <h2>blogs</h2>
      <h3>{user.name} logged in <button onClick={logoutHandler}>logout</button></h3>
      <AddBlogForm />
      { blogs.map(blog => <Blog key={blog.id} blog={blog} blogUpdatedHandler = {blogUpdatedHandler}/>)}
    </div >
  )
}

export default App