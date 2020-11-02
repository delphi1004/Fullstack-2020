import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import LoginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = ({ userLoggedinHandler }) => {

  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await LoginService.login({ username, password })
      console.log('logging in with', user)
      setUsername('')
      setPassword('')
      userLoggedinHandler(user)
      dispatch(setNotification(`${user.name} logged in`))
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>Username: <input id='username' type='text' value={username} onChange={({ target }) => setUsername(target.value)} /> </div>
        <div>Passward: <input id='password' type='password' value={password} onChange={({ target }) => setPassword(target.value)} /></div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  userLoggedinHandler: PropTypes.func.isRequired,
}

export default LoginForm