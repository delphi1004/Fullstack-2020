
import React from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'
import User from './user'
import { useSelector } from 'react-redux'

const Header = () => {
  const user = useSelector(state => state.user)
  const activeName = user ? 'active' : null

  return (
    <div id='header'>
      <NavLink exact to='/' className='link' activeClassName={activeName}>Blogs</NavLink>
      <NavLink exact to='/users' className='link' activeClassName={activeName}>Users</NavLink>
      <User />
    </div >
  )
}

export default Header