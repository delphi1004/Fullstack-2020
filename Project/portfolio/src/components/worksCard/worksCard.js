/* eslint-disable no-unused-vars */
import React from 'react'
// import { useDispatch } from 'react-redux'
// import { setCurrentMenu, setCurrentWorksMenu } from '../reducer/statusReducer'
// import { useSelector } from 'react-redux'
// import { global } from '../data/global'
import './worksCard.css'

const WorksCard = ({ index, info }) => {
  const delay = `${index/3}s`
  const number = (index + 1).toString().padStart(2, 0)

  return (
    <div id = 'worksCard' style={{ '--backgroundColor': info.backgroundColor, '--delay': delay }}>
      <img id = 'thumbnailImage' src = {info.titleImage} alt = 'image'/>
      <p id='works-title'>{info.title}</p>
      <p id='works-separator'></p>
      <p id='works-description'>{info.description}</p>
      <p id='works-number'>{number}</p>
      <p id='works-vertical-separator'></p>
      <div id = 'works-extraDescription-container'>
        <p id = 'works-extraDescription'>{info.extraDescription} </p>
      </div>
    </div>
  )
}

export default WorksCard