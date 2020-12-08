import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentMenu } from '../reducer/statusReducer'
import { global } from '../data/global'
import './about.css'

const About = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentMenu(global.menu.about))
  }, [])

  return (
    <div id='aboutContainer'>
      <h1 id='aboutTitle'>I am a Creative technologist, New media artist</h1>
      <div id='aboutDescription'>
        <p >
          with mobile dev and media art experience, wanting to focus on my skills more on creative projects. I have over a decade of professional programming experience (C#, C++, C, Objective-C). I have experienced with Unity3D and computer graphics(shader coding, OpenGL, graphics pipeline). I have also made interactive art installations and released a mobile app on iOS. I want to combine all of those skills to help make a great creative project. I am looking for creative projects and want to work with passionate people.
        </p>
      </div>
    </div >
  )
}

export default About