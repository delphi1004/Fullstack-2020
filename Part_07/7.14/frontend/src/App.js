/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/blog'
import './App.css'
import LoginForm from './components/loginform'
import NewBlogForm from './components/newblogform'
import Togglabel from './components/togglabel'
import Notification from './components/notification'
import { setUserLoggedIn } from './reducers/userReducer'
import Header from './components/header'
import Users from './components/users'
import UserBlogs from './components/userblogs'
import loadAllUser from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const togglabelRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON)
        dispatch(setUserLoggedIn(user))
      } catch (exception) {
        console.log(exception)
      }
    }
  }, [])

  const UserLoginForm = (style) => (
    <div style={{ paddingTop: 10, paddingLeft: 10 }}>
      <Togglabel buttonLabel='login'>
        <LoginForm />
      </Togglabel>
    </div >
  )

  const AddBlogForm = () => (
    <Togglabel buttonLabel='new blog' ref={togglabelRef}>
      <NewBlogForm togglabelRef={togglabelRef} />
    </Togglabel>
  )

  return (
    <Router>
      <Notification />
      <Header />
      {user === null &&
        <UserLoginForm />
      }

      <Switch>
        <Route exact path='/users' component = {Users}>
        </Route>
        <Route path='/users/:id' component = {UserBlogs}>
        </Route>
      </Switch>
    </Router>
  )
}

export default App