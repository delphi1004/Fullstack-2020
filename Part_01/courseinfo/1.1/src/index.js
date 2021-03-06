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

const Contents = (props) =>{
  return (
    <div>
      <h3>{props.part1} {props.exercises1}</h3>
      <h3>{props.part2} {props.exercises2}</h3>
      <h3>{props.part3} {props.exercises3}</h3>
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} /><br/>
      <h2>Part Information</h2>
      <Contents part1 = {part1} exercises1 = {exercises1} part2 = {part2} exercises2 = {exercises2} part3 = {part3} exercises3 = {exercises3} />
      <br/>
      <Total total = {exercises1+exercises2+exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))