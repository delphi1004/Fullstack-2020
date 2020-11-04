import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserLoggedOut } from '../reducers/loggedInUserReducer'
import { useHistory } from 'react-router-dom'
import { clearAllUsers } from '../reducers/usersReducer'

const User = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const loggedInUser = useSelector(state => state.loggedInUser)

  const logoutHandler = () => {
    dispatch(setUserLoggedOut())
    dispatch(clearAllUsers())
    history.push('/')
    window.localStorage.clear()
  }

  return (
    <div>
      { loggedInUser &&
        <p style={{ paddingLeft: 50 }}>{loggedInUser.name} logged in <button onClick={logoutHandler}>logout</button></p>
      }
    </div>
  )
}

export default User