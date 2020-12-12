import React from 'react'
// import { useDispatch } from 'react-redux'
// import { setCurrentMenu, setCurrentWorksMenu } from '../reducer/statusReducer'
// import { useSelector } from 'react-redux'
// import { global } from '../data/global'
import './cardContainer.css'
import Card from './card.js'
import { Data_Generative } from '../../data/global'

const CardContainer = () => {

  return (
    <div id='cardContainer'>
      {Data_Generative.contents.map((info,index) =>
        <Card className='wrap' key={index} info={info} resourcePath={Data_Generative.imagePath}/>
      )
      }
    </div>
  )
}

export default CardContainer