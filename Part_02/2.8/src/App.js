import './App.css';
import React, { useState ,useRef} from 'react'

const Person = ({person}) => {
  return(
      <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const inputNameRef = useRef()

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' ,number:'040-1234567'}
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const existed = persons.findIndex(person => person.name === newName)
    if (existed <0){
      setPersons(persons.concat({name:newName , number:newNumber}))
    }else{
      alert(`${newName} is already added to phonebook`)
    }
    
    setNewName('')
    setNewNumber('')

    inputNameRef.current.focus();
  }
  
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
     
      <form onSubmit = {addPerson}>
        <h2>add a new</h2>
        <div>name: <input value = {newName} onChange = {handlePersonChange} ref = {inputNameRef}/></div>
        <div>number: <input value = {newNumber} onChange = {handleNumberChange}/></div>
        <div><button type = "submit">add</button></div>
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