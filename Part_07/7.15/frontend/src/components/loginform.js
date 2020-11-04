import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loggedInUserReducer'
import { useHistory } from 'react-router-dom'

const style = {
  paddingTop: 100,
  color: 'black',
  textDecoration: 'none'
}

const LoginForm = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setUsername('')
    setPassword('')

    dispatch(login(username, password))
      .then(() => { history.push('/') })
      .catch(exception => {
        dispatch(setNotification(exception))
      })
  }

  return (
    <div style={{ style }}>
      <h2>Log in to application</h2>
      <h2>{loggedInUser && loggedInUser.name}</h2>
      <form onSubmit={handleLogin}>
        <div>Username: <input id='username' type='text' value={username} onChange={({ target }) => setUsername(target.value)} /> </div>
        <div>Passward: <input id='password' type='password' value={password} onChange={({ target }) => setPassword(target.value)} /></div>
        <button id='login-button' style={{ width: 60 }} type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm