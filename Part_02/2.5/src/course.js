import React from 'react'

export default function Course(course){

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