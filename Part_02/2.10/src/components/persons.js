import React from 'react'

const Person = ({person}) => {
    return(
        <li>{person.name} {person.number}</li>
    )
}

const Persons = ({personToShow}) =>{
    return(
        <ul>
         {personToShow.map(person => 
           <Person key = {person.name} person = {person} />
         )}
      </ul>
    )
}

export default Persons