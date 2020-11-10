
export const setUserLoggedIn = (loggedInUser) => {
  return dispatch => {
    dispatch(
      {
        type: 'SET_USER_LOGGED_IN',
        loggedIn : true
      }
    )
  }
}

export const setUserLoggedOut = () => {
  return dispatch => {
    dispatch(
      {
        type: 'SET_USER_LOGGED_OUT',
        loggedIn : false
      }
    )
  }
}

const loggedInUserReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER_LOGGED_IN':
    {
      console.log(`user has logged in`)
      return action.loggedIn
    }

    case 'SET_USER_LOGGED_OUT':
      console.log(`user has logged out`)
      return action.loggedIn
    default:
  }

  return state
}

export default loggedInUserReducer

