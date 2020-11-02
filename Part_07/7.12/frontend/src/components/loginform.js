import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/userReducer'

const LoginForm = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setUsername('')
    setPassword('')

    dispatch(login(username, password)).catch(exception => {
      dispatch(setNotification(exception.response.data.error))
    })
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <h2>{user && user.name}</h2>
      <form onSubmit={handleLogin}>
        <div>Username: <input id='username' type='text' value={username} onChange={({ target }) => setUsername(target.value)} /> </div>
        <div>Passward: <input id='password' type='password' value={password} onChange={({ target }) => setPassword(target.value)} /></div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm