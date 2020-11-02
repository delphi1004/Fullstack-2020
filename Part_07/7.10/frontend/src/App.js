import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/blog'
import './App.css'
import LoginForm from './components/loginform'
import NewBlogForm from './components/newblogform'
import Togglabel from './components/togglabel'
import Notification from './components/notification'
import { loadUserBlog } from './reducers/blogReducer'
import { setUserLoggedIn } from './reducers/userReducer'
import BlogService from './services/blogs'
import User from './components/user'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const togglabelRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      BlogService.setToken(user.token)
      dispatch(setUserLoggedIn(user))
      dispatch(loadUserBlog(user))
    }
  }, [])

  const UserLoginForm = () => (
    <Togglabel buttonLabel='login'>
      <LoginForm />
    </Togglabel>
  )

  const AddBlogForm = () => (
    <Togglabel buttonLabel='new blog' ref={togglabelRef}>
      <NewBlogForm togglabelRef={togglabelRef} />
    </Togglabel>
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
      <User />
      <AddBlogForm />
      <Blog />
    </div>
  )
}

export default App