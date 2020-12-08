import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentMenu } from '../reducer/statusReducer'
import { global } from '../data/global'
import './works.css'

const Works = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentMenu(global.menu.works))
  }, [])

  return (
    <div id='worksContainer'>
      <h1>Hello World , this is works view</h1>
    </div >
  )
}

export default Works