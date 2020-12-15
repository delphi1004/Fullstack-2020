import React from 'react'
// import { useDispatch } from 'react-redux'
// import { setCurrentMenu, setCurrentWorksMenu } from '../reducer/statusReducer'
// import { useSelector } from 'react-redux'
// import { global } from '../data/global'
import './card.css'

const Card = ({ index, info, resourcePath }) => {
  const delay = `${index / 7}s`
  const thumbnailImage = `${resourcePath}/thumbnail/${info.thumbnailImage}.png`

  console.log(`${resourcePath}/thumbnail/${info.thumbnailImage}`, thumbnailImage,index)

  return (
    <div id='card' style={{ '--delay' : delay } }>
      <img id = 'thumbnailImage' src = {thumbnailImage} alt = 'image'/>
      <div id = {'cardTitleContainer'}>
        <p id = 'title'>{info.title}</p>
        <p id= 'subTitle'>{info.subTitle}</p>
      </div>
    </div>
  )
}

export default Card