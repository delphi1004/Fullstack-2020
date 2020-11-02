let timerId

export const setNotification = (msg, timeout = 5) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      msg
    })
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      dispatch(resetNotification())
    }, timeout * 1000)
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
  }
}

const initMessage = ''
const notificationReducer = (state = initMessage, action) => {

  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.msg
    }

    case 'RESET_NOTIFICATION': {
      return initMessage
    }

    default:
  }
  return state
}

export default notificationReducer