import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentMenu, setCurrentWorksMenu } from '../reducer/statusReducer'
import { useSelector } from 'react-redux'
import { global } from '../data/global'
import './works.css'
import CardContainer from './card/cardContainer'

const Works = () => {
  const dispatch = useDispatch()
  const worksMenu = useSelector(state => state.systemStatus.currentWorksMenu)

  useEffect(() => {
    dispatch(setCurrentWorksMenu(global.menu.idle))
    dispatch(setCurrentMenu(global.menu.works))
  }, [])

  const clickHandler = (id) => {
    dispatch(setCurrentWorksMenu(global.menu.idle))
    setTimeout(() => {
      dispatch(setCurrentWorksMenu(id))
    }, 1)
  }

  return (
    <div id='worksContainer'>
      <div id='workMenuContainer'>
        <p id='works-generativeArt' style={worksMenu === global.worksMenu.generativeArt ? { color: 'white' } : {}}
          onClick={() => { clickHandler(global.worksMenu.generativeArt) }}>
          Genarative art
        </p>
        <p id='works-interactiveArt' style={worksMenu === global.worksMenu.interactiveArt ? { color: 'white' } : {}}
          onClick={() => { clickHandler(global.worksMenu.interactiveArt) }}>
          Interactive art
        </p>
        <p id='works-modeling' style={worksMenu === global.worksMenu.modeling ? { color: 'white' } : {}}
          onClick={() => { clickHandler(global.worksMenu.modeling) }}>
          3D modeling
        </p>
        <p id='works-software' style={worksMenu === global.worksMenu.software ? { color: 'white' } : {}}
          onClick={() => { clickHandler(global.worksMenu.software) }}>
          Software architecture
        </p>
      </div>
      {worksMenu !== global.menu.idle &&
        <CardContainer worksMenu={worksMenu}/>
      }
    </div >
  )
}

export default Works