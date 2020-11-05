import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserLoggedOut } from '../reducers/loggedInUserReducer'
import { useHistory } from 'react-router-dom'
import { clearAllUsers } from '../reducers/usersReducer'
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

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
        <p style={{ paddingLeft: 50 }}>{loggedInUser.name} logged in
          <IconButton style={{ color: 'white' }} onClick={() => logoutHandler()}>
            <ExitToAppIcon />
          </IconButton>
        </p>
      }
    </div>
  )
}

export default User