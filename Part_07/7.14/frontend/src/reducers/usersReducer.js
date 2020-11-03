import UserService from '../services/users'

export const loadAllUser = () => {
  return async dispatch => {
    const users = await UserService.getAllUsers()
    dispatch(
      {
        type: 'SET_ALL_USERS',
        users
      }
    )
  }
}

const usersReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ALL_USERS':
    {
      return action.users
    }

    case 'CLEAR_ALL_USERS':
      return null
    default:
  }

  return state
}

export default usersReducer

