import React from 'react'
import ReactDOM from 'react-dom'

function ShowCourse(course){

  let total = 0;
  total = course.parts.reduce((prevTotal, part) => (prevTotal+part.exercises),0)

  return(
    <div key = {course.id}>
      <h2>{course.name}</h2>
      <h3>
          {course.parts.map(part => 
            <p key={part.id}> {part.name} {part.exercises}</p>
          )}
      </h3>
      <h3>Total of {total} exercises</h3>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => ShowCourse(course))}
    </div>
    )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)