import React from 'react'

const Notification = ({ msg, resetMessageHandler }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (msg === null) {
    return null
  }

  setTimeout(() => {
    resetMessageHandler(null)
  }, 3000)

  return (
    <div style={style}>
      {msg}
    </div>
  )
}

export default Notification