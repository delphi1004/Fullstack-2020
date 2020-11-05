
import LoginService from '../services/login'
import BlogService from '../services/blogs'
import { loadAllUser } from './usersReducer'

export const setUserLoggedIn = (loggedInUser) => {
  return dispatch => {
    BlogService.setToken(loggedInUser.token)
    dispatch(loadAllUser())
    dispatch(
      {
        type: 'SET_USER_LOGGED_IN',
        loggedInUser
      }
    )
  }
}

export const setUserLoggedOut = () => {
  return dispatch => {
    dispatch(
      {
        type: 'SET_USER_LOGGED_OUT',
      }
    )
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await LoginService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    dispatch(setUserLoggedIn(user))
  }
}

const loggedInUserReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER_LOGGED_IN':
    {
      console.log(`${action.loggedInUser.name} has logged in`)
      return action.loggedInUser
    }

    case 'SET_USER_LOGGED_OUT':
      console.log(`${state.name} has logged out`)
      return null
    default:
  }

  return state
}

export default loggedInUserReducer

