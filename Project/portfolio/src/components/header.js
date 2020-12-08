import React from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'

const Header = () => {
  return (
    <div id='header'>
      <div id='mainMenu'>
        <NavLink exact to='/about' activeClassName={'active'}>about</NavLink>
        <NavLink exact to='/works' activeClassName={'active'}>works</NavLink>
        <NavLink exact to='/exhibition' activeClassName={'active'}>exhibition</NavLink>
        <NavLink exact to='/cv' activeClassName={'active'}>cv</NavLink>
        <NavLink exact to='/contact' activeClassName={'active'}>contact</NavLink>
      </div>
    </div >
  )
}

export default Header