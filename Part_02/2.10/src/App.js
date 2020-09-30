import './App.css';
import React, { useState ,useRef} from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'

const App = () => {

  const inputNameRef = useRef()
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

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

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
    console.log(event.target.value)
  }

 const personToShow = persons.filter(person => person.name.includes(nameFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter = {nameFilter} handleNameFilterChange = {handleNameFilterChange} />
      
      <h2>add a new</h2>
      <PersonForm addPerson = {addPerson} newName = {newName} newNumber = {newNumber} handlePersonChange = {handlePersonChange} handleNumberChange = {handleNumberChange} inputNameRef = {inputNameRef} />
      
      <h2>Numbers</h2>
      <Persons personToShow = {personToShow} />
    </div>
  )
  
}

export default App