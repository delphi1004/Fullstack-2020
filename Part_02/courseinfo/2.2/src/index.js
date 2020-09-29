import React from 'react'
import ReactDOM from 'react-dom'

function Course({course}){

  let sum = 0;

  for(let part of course.parts){
    sum += part.exercises
  }

  return(
    <div>
      <h2>{course.name}</h2>
      <h3>
          {course.parts.map(part => 
            <p key={part.id}> {part.name} {part.exercises}</p>
          )}
      </h3>
      <h2>Total of {sum} exercises</h2>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)