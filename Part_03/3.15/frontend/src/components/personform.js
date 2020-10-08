import React from 'react'

const PersonForm = ({addPerson,newName,newNumber,handlePersonChange,handleNumberChange,inputNameRef}) =>{
    return(
        <form onSubmit = {addPerson}>
        <div>name: <input value = {newName} onChange = {handlePersonChange} ref = {inputNameRef}/></div>
        <div>number: <input value = {newNumber} onChange = {handleNumberChange}/></div>
        <div><button type = "submit">add</button></div>
      </form>
    )
}

export default PersonForm