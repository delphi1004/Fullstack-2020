import React from 'react'

const Persons = ({personToShow , deletePersonHandler}) =>{
    return(
        <ul>
         {personToShow.map((person,index) => 
           <li key = {index}>{person.name} {person.number} <button onClick = {() => deletePersonHandler(person.id)}>delete</button></li>
         )}
      </ul>
    )
}

export default Persons