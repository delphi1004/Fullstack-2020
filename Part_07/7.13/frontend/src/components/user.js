import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserLoggedOut } from '../reducers/userReducer'
import { useHistory } from 'react-router-dom'

const User = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    dispatch(setUserLoggedOut())
    history.push('/')
    window.localStorage.clear()
  }

  return (
    <div>
      { user &&
        <p style={{ paddingLeft: 50 }}>{user.name} logged in <button onClick={logoutHandler}>logout</button></p>
      }
    </div>
  )
}

export default User