import React from 'react'

const Persons = ({personToShow}) =>{
    return(
        <ul>
         {personToShow.map((person,index) => 
           <li key = {index}>{person.name} {person.phone}</li>
         )}
      </ul>
    )
}

export default Persons