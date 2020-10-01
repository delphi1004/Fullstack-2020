import React , {useState , useEffect} from 'react';
import axios from 'axios'
import './App.css';

const ShowWeather = ({capitalName}) => {

  const [weatherData, setWeatherData] = useState()

  console.log('ShowWeather')
  
  useEffect(() => {
      const api_key = process.env.REACT_APP_API_KEY
      const weatherQuery = 'http://api.weatherstack.com/current?access_key='+api_key+'&query='+capitalName
      axios
      .get(weatherQuery)
      .then(response => {
        console.log(response.data)
        setWeatherData(response.data)
      })
    },[capitalName])

  return(
    <div>
      <h3>Weather in {capitalName}</h3>
      {weatherData &&
        <div>
          <p><b>temperature :</b>{weatherData.current.temperature} celcius</p>
          <img src = {weatherData.current.weather_icons[0]} width = {100} alt = 'weather icon'/>
          <p><b>wind :</b>{weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</p>
        </div>
      }
    </div>
  )
}

const ShowCountries = ({foundCountries}) =>{

  return(
    <div>
      {foundCountries.length > 10 ? <h3>Too many matches, specify another filter</h3> : foundCountries.length > 1 ?
        <div>
          {foundCountries.map((data,index) => <h4 key = {index}>{data.name}</h4>)}
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
          <ShowWeather capitalName = {foundCountries[0].capital} />
        </div>
      }
    </div>
  )
}

function App() {

  const [countries , setCountries] = useState([])
  const [findName, setFindName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
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
