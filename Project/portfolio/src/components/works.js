/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentMenu, setCurrentWorksMenu } from '../reducer/statusReducer'
import { useSelector } from 'react-redux'
import { global } from '../data/global'
import { Data_WorksMenu_Generative } from '../data/global'
import './works.css'
import WorksCard from './worksCard/worksCard'

const Works = () => {
  const dispatch = useDispatch()
  const worksMenu = useSelector(state => state.systemStatus.currentWorksMenu)

  useEffect(() => {
    dispatch(setCurrentWorksMenu(global.menu.idle))
    dispatch(setCurrentMenu(global.menu.works))
  }, [])

  // const clickHandler = (id) => {
  //   dispatch(setCurrentWorksMenu(global.menu.idle))
  //   setTimeout(() => {
  //     dispatch(setCurrentWorksMenu(id))
  //   }, 1)
  // }

  return (
    <div id='worksContainer'>
      <div id='workMenuContainer'>
        {Data_WorksMenu_Generative.contents.map((info, index) => (
          <WorksCard key={index} index={index} info={info}/>
        ))}
      </div>
    </div >
  )
}

export default Works