import React from 'react'
import './title.css'

const Title = () => {
  const title = 'I\'m John Lee'
  return (
    <div id = 'titleContainer'>
      <p className='title'>{title}</p>
      <p className='description'>A Creative technologist</p>
      <p className='description'>New media artist.</p>
    </div>
  )
}

export default Title