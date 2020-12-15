import React from 'react'
// import { useDispatch } from 'react-redux'
// import { setCurrentMenu, setCurrentWorksMenu } from '../reducer/statusReducer'
// import { useSelector } from 'react-redux'
// import { global } from '../data/global'
import './cardContainer.css'
import Card from './card.js'
import { global } from '../../data/global'
import { Data_Generative , Data_Interactive } from '../../data/global'

const CardContainer = ({ worksMenu }) => {
  let data

  switch (worksMenu) {
    case global.worksMenu.generativeArt: data = Data_Generative; break
    case global.worksMenu.interactiveArt: data = Data_Interactive; break
  }

  return (
    <div id='cardContainer'>
      {/* <p id = 'works-words'>{data.words}</p> */}
      {data.contents.map((info,index) =>
        <Card className='wrap' key={index} index={index+1} info={info} resourcePath={Data_Generative.resourcePath}/>
      )
      }
    </div>
  )
}

export default CardContainer