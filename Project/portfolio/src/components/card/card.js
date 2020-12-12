import React from 'react'
// import { useDispatch } from 'react-redux'
// import { setCurrentMenu, setCurrentWorksMenu } from '../reducer/statusReducer'
// import { useSelector } from 'react-redux'
// import { global } from '../data/global'
import './card.css'

const Card = ({ info }) => {

  const test = require('../../data/resource/works/small/shape_01.png')
  console.log(test,info)

  // return (
  //   <div id = 'card'>
  //     <div id = 'cardImage'>
  //       <h1>{info.thumbnailImage}</h1>
  //       <img width='500' height = '500' src = {test} alt = 'image'/>
  //     </div>
  //     <div id = 'cardTitleContainer'>
  //       <p id = 'title'>{info.title}</p>
  //       <p id=  'subTitle'>{info.subTitle}</p>
  //     </div>
  //   </div>
  // )

  return (
    <div>
      <img src = {test} style = {{ width:'100%' }} alt = 'image'/>
    </div>
  )
}

export default Card