import LoginService from '../services/login'
import BlogService from '../services/blogs'
import { loadUserBlog } from '../reducers/blogReducer'

export const setUserLoggedIn = (user) => {
  return {
    type: 'SET_USER_LOGGED_IN',
    user
  }
}

export const setUserLoggedOut = () => {
  return {
    type: 'SET_USER_LOGGED_OUT',
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await LoginService.login({ username, password })

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    BlogService.setToken(user.token)
    dispatch(loadUserBlog(user))

    dispatch({
      type: 'SET_USER_LOGGED_IN',
      user
    })
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER_LOGGED_IN':
    {
      console.log(`${action.user.name} has logged in`)
      return action.user
    }

    case 'SET_USER_LOGGED_OUT':
      console.log(`${state.name} has logged out`)
      return null
    default:
  }

  return state
}

export default userReducer

