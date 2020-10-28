import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetNotification } from '../reducers/notificationReducer'

let timeout

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification.length > 0) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(resetNotification())
    }, 5000);

    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

  return null
}

export default Notification