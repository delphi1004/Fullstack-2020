import './App.css';
import React, { useState } from 'react'

const Person = ({person}) => {
  return(
      <li>{person.name}</li>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    setPersons(persons.concat({name:newName}))
    setNewName('')
  }
  
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input value = {newName} onChange = {handlePersonChange}/>
        </div>
        <div>
          <button type = "submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key = {person.name} person = {person} />
        )}
      </ul>
    </div>
  )
}

export default App