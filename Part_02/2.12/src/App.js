import React , {useState , useEffect} from 'react';
import axios from 'axios'
import './App.css';

let countries = []

const ShowCountries = ({foundCountries}) =>{

  return(
    <div>
      {foundCountries.length > 10 ? <h3>Too many matches, specify another filter</h3> : foundCountries.length > 1 ?
        <div>
          {foundCountries.map((data,index) => <h4 key = {data.index}>{data.name}</h4>)}
        </div> :
        <div>
          <h2>{foundCountries[0].name}</h2>
          <h4>capital {foundCountries[0].capital}</h4>
          <h4>population {foundCountries[0].population}</h4>
          <h3>languages</h3>
          <ul>
            {foundCountries[0].languages.map((data,index) => <li key = {index}>{data.name}</li>)}
          </ul>
          <img src = {foundCountries[0].flag} width = {100}alt = {foundCountries[0].name}/>
        </div>
        
      }
    </div>
  )
}

function App() {

  const [findName, setFindName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        countries = response.data
        console.log("fetch is done")
      })
  }, [])

  const findCountries = (event) =>{
    setFindName(event.target.value)
    console.log(findName)
  }

  const foundCountries = countries.filter(data => data.name.toUpperCase().includes(findName.toUpperCase()))

  return (
    <div>
      <form>
        find countries <input value = {findName} onChange = {findCountries} />
      </form>
      {findName.length > 0 && foundCountries.length > 0 && <ShowCountries foundCountries = {foundCountries}/>}      
    </div>
  )
}

export default App;
