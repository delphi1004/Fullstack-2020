import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.length > 0) {
    return (
      <div id='notification'>
        {notification}
      </div>
    )
  }

  return null
}

export default Notification