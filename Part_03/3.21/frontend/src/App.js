import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import service from './services/person'

const ShowNotificaitonMessage = ({ msg, resetMessageHandler }) => {

  if (msg === null) {
    return null
  }

  setTimeout(() => {
    resetMessageHandler(null)
  }, 3000);

  return (
    <div id='notification'>
      <h3>{msg}</h3>
    </div>
  )
}

const App = () => {

  let personToShow = null
  const inputNameRef = useRef()
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    getAll()
  }, [])

  const getAll = () => {
    console.log('effect')
    service.getAll()
      .then(data => { setPersons(data) })
      .catch(error => { console.log(error) })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personExisted = persons.findIndex(person => person.name === newName)
    const numberExsited = persons.findIndex(person => person.number === newNumber && person.name === newName)

    if (personExisted < 0) {
      let newPerson = { name: newName, number: newNumber }
        service.addNewData(newPerson)
        .then(data => {
          setPersons(persons.concat(data)); 
          setNotificationMessage('added '+newName)
        }).catch(error => {setNotificationMessage(error.message)})
    }else if (numberExsited < 0){
      if (window.confirm(newName+"is already added to phonebook,replace old number with a new one?")) {
        const changedPerson = {...persons[personExisted] , number: newNumber}
        service.updateData(changedPerson)
        .then(data => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson));
          setNotificationMessage(`${newName}'s phone number has changed to ${newNumber}`)
        }).catch(error => {
          setNotificationMessage(error.message);
          getAll()
        })
      } 
    }else{
      alert(`${newName} is already added to phonebook`)
    }

    setNewName('')
    setNewNumber('')

    inputNameRef.current.focus();
  }

  const deletePerson = (id) => {
    service.deletePerson(id)
      .then(result => {setNotificationMessage(`${result.name} removed`); setPersons(persons.filter(person => person.id !== id)) })
      .catch(error => { console.log(error) })
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

  if (persons !== null) {
    personToShow = persons.filter(person => person.name.toUpperCase().includes(nameFilter.toUpperCase()))

    return (
      <div>
        <h2>Phonebook</h2>
        <ShowNotificaitonMessage msg={notificationMessage} resetMessageHandler={setNotificationMessage} />
        <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />

        <h2>add a new</h2>
        <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} inputNameRef={inputNameRef} />

        <h2>Numbers</h2>
        <Persons personToShow={personToShow} deletePersonHandler={deletePerson} />
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