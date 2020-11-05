
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Blogs from './components/blogs'
import BlogDetail from './components/blogdetail'
import './App.css'
import LoginForm from './components/loginform'
import Togglabel from './components/togglabel'
import Notification from './components/notification'
import { setUserLoggedIn } from './reducers/loggedInUserReducer'
import Header from './components/header'
import UsersBlog from './components/usersblog'
import UserBlogs from './components/userblogs'

const App = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

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

  const UserLoginForm = () => (
    <div style={{ paddingTop: 10, paddingLeft: 10 }}>
      <Togglabel buttonLabel='login'>
        <LoginForm />
      </Togglabel>
    </div >
  )

  return (
    <Router>
      <Notification />
      <Header />
      {loggedInUser === null &&
        <UserLoginForm />
      }

      <Switch>
        <Route exact path='/users' component = {UsersBlog}></Route>
        <Route path='/users/:id' component = {UserBlogs}></Route>
        <Route path='/blogs/:id' component = {BlogDetail}></Route>
        <Route exact path='/' component = {Blogs}></Route>
      </Switch>
    </Router>
  )
}

export default App