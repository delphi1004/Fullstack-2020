/* eslint-disable no-unused-vars */
import './App.css'
import { BrowserRouter as Router, Switch, Route , useLocation } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SwitchTransition, CSSTransition, TransitionGroup } from 'react-transition-group'
import Header from './components/header'
import Title from './components/title'
import About from './components/about'
import Works from './components/works'

const RouterViewer = () => {
  const location = useLocation()
  const currentMenu = useSelector(state => state.systemStatus.currentMenu)

  return (
    <TransitionGroup mode = {'out-in'}>
      <CSSTransition classNames='views' key={location.key} timeout={currentMenu >= 0 ? 0:1300}>
        <Switch location = {location}>
          <Route exact path='/about' component={About}></Route>
          <Route exact path='/works' component={Works}></Route>
          <Route exact path='/' component={Title}></Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <RouterViewer />
      </Router>
    </div>
  )
}




export default App

