import './App.css';
import React, { useState ,useRef , useEffect} from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import axios from 'axios'
import service from './services/person'

const App = () => {

  let  personToShow
  const inputNameRef = useRef()
  const [persons, setPersons] = useState()
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
        setTimeout(() => {
          service.getAll()
          .then(data => {setPersons(data)})
        }, 1000);// trying to make a little delay for sure data loading message appears on the screen.
    },[])

  const addPerson = (event) => {
    event.preventDefault()
    const existed = persons.findIndex(person => person.name === newName)

    if (existed <0){
      let newPerson = {name:newName, number:newNumber}
      service.addNewData(newPerson)
      .then(data => {setPersons(persons.concat(data))})
    }else{
      alert(`${newName} is already added to phonebook`)
    }

    setNewName('')
    setNewNumber('')

    inputNameRef.current.focus();
  }
  
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  if(persons !== undefined){
    personToShow = persons.filter(person => person.name.toUpperCase().includes(nameFilter.toUpperCase()))

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
  }else{
      return(
        <div>
          <h1>Loading phonebook data...</h1>
        </div>
      )
    }
}

export default App