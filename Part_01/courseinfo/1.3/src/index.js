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

const Contents = (props) =>{
  return (
    <div>
      <Part name = {props.part1.name} exercises = {props.part1.exercises}/>
      <Part name = {props.part2.name} exercises = {props.part2.exercises}/>
      <Part name = {props.part3.name} exercises = {props.part3.exercises}/>
    </div> 
  )
}

const Total = (props) =>{
  return (
    <div>
      <h2><u>Total is {props.total}</u></h2>
    </div> 
  )
}

const App = () => {
  
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} /><br/>
      <h2>Part Information</h2>
      <Contents part1 = {part1} part2 = {part2}  part3 = {part3}/>
      <br/>
      <Total total = {part1.exercises+part2.exercises+part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))