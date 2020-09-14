import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>{
  return (
    <div>
      <h2>Course Name</h2>
      <h3>{props.course}</h3>
    </div> 
  )
}

const Part = (props) =>{
  return (
    <div>
      <h3>{props.name} {props.exercises}</h3>
    </div>
  )
}

const Content = (props) =>{
  return (
    <div>
      <Part name = {props.parts[0].name} exercises = {props.parts[0].exercises}/>
      <Part name = {props.parts[1].name} exercises = {props.parts[1].exercises}/>
      <Part name = {props.parts[2].name} exercises = {props.parts[2].exercises}/>
    </div> 
  )
}

const Total = (props) =>{

  const totalExercises = (props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises)

  return (
    <div>
      <h2><u>Total is {totalExercises}</u></h2>
    </div> 
  )
}

const App = () => {
  
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} /> <br/>
      <Content parts={parts} /> <br/>
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))