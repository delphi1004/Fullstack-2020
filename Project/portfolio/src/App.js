import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import Base from './components/base'
import Header from './components/header'
import Title from './components/title'

function App () {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' component={Header}></Route>
        </Switch>
      </Router>
      <Base />
      <Title />

    </div>
  )
}




export default App

