import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/blog'
import BlogService from './services/blogs'
import './App.css'
import LoginForm from './components/loginform'
import NewBlogForm from './components/newblogform'
import Togglabel from './components/togglabel'
import Notification from './components/notification'
import { setNotification } from './reducers/notificationReducer'


const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const togglabelRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userLoggedinHandler(user)
    }
  }, [])

  const userLoggedinHandler = async (user) => {
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )

    try {
      BlogService.setToken(user.token)
      console.log(`${user.name} has logged in`)
      const blogs = await BlogService.getUserBlog(user.id)
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
      setUser(user)
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error))
    }
  }

  const blogAddedHandler = (blog) => {
    setBlogs(blogs.concat(blog))
    togglabelRef.current.toggleVisibility()
  }

  const blogUpdatedHandler = (updatedBlog) => {
    const index = blogs.findIndex(blog => blog.id === updatedBlog.id)
    blogs.splice(index, 1, updatedBlog)
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs.map(blog => blog))
  }

  const blogRemovedHandler = (removedBlog) => {
    const index = blogs.findIndex(blog => blog.id === removedBlog.id)
    blogs.splice(index, 1)
    setBlogs(blogs.map(blog => blog))
  }

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const UserLoginForm = () => (
    <Togglabel buttonLabel='login'>
      <LoginForm userLoggedinHandler={userLoggedinHandler} />
    </Togglabel>
  )

  const AddBlogForm = () => (
    <Togglabel buttonLabel='new blog' ref={togglabelRef}>
      <NewBlogForm blogAddedHandler={blogAddedHandler}/>
    </Togglabel>
  )

  const ShowBlog = (blog) => (
    <Blog key={blog.id} blog={blog} blogUpdatedHandler={blogUpdatedHandler}
      blogRemovedHandler={blogRemovedHandler} user={user.name} />
  )

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Blogs</h2>
        <UserLoginForm />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <h3>{user.name} logged in <button onClick={logoutHandler}>logout</button></h3>
      <AddBlogForm />
      { blogs.map(blog => ShowBlog(blog))}
    </div>
  )
}

export default App