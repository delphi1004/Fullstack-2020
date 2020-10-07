import './App.css';
import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Persons from './components/persons'
import service from './services/person'

const App = () => {

  let personToShow = null
  const [persons, setPersons] = useState(null)
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    service.getAll()
      .then(data => { 
        console.log(data)
        setPersons(data) })
      .catch(error => { console.log(error) })
  }, [])

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  if (persons !== null) {
    personToShow = persons.filter(person => person.name.toUpperCase().includes(nameFilter.toUpperCase()))

    return (
      <div>
        <h2>Phonebook</h2>
        <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />

        <h2>Numbers</h2>
        <Persons personToShow={personToShow}/>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Loading phonebook data...</h1>
      </div>
    )
  }
}

export default App