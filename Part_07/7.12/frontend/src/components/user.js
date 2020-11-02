import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserLoggedOut } from '../reducers/userReducer'

const User = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    dispatch(setUserLoggedOut())
    window.localStorage.clear()
  }

  return (
    <div>
      <h3>{user.name} logged in <button onClick={logoutHandler}>logout</button></h3>
    </div>
  )
}

export default User