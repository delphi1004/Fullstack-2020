
import React from 'react'
import  { Link } from 'react-router-dom'
import './header.css'
import User from './user'

const Header = () => {
  return (
    <div id='header'>
      <Link to='/' className='link'>Blogs</Link>
      <Link to='/users' className='link'>Users</Link>
      <User />
    </div >
  )
}

export default Header