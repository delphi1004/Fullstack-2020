import React , {useState , useEffect} from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Contact List</h1>
      {persons.map(person => <h3 key = {person.id}>{person.id} {person.name} {person.number}</h3>)
    }
    </div>
  )
}

export default App;
