import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

const ShowWeather = ({ capitalName }) => {

  const [weatherData, setWeatherData] = useState()

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    const weatherQuery = 'http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + capitalName

    axios
      .get(weatherQuery)
      .then(response => {
        if (response.data.current !== undefined) {
          setWeatherData(response.data)
        }else{
          setWeatherData(null)
        }
      }).catch(error => {
        console.log(error)
      })

  }, [capitalName])

  return (
    <div>
      <h3>Weather in {capitalName}</h3>
      {weatherData &&
        <div>
          <p><b>temperature :</b>{weatherData.current.temperature} celcius</p>
          <img src={weatherData.current.weather_icons[0]} width={100} alt='weather icon' />
          <p><b>wind :</b>{weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</p>
        </div>
      }
    </div>
  )
}

const ShowCountryDetail = ({ country }) => {

  return (
    <div>
      <hr align="left" width="300" />
      <h5>capital {country.capital}</h5>
      <h5>population {country.population}</h5>
      <h4>languages</h4>
      <ul>
        {country.languages.map(data => <li key={data.name}>{data.name}</li>)}
      </ul>
      <img src={country.flag} width={100} alt={country.name} />
      <hr align="left" width="300" />
      <ShowWeather capitalName={country.capital} />
    </div>
  )
}

const ShowCountries = ({ foundCountries }) => {

  const [clickedIndex, setClickedIndex] = useState(-1)

  return (
    <div>
      {foundCountries.length > 10 ? <h3>Too many matches, specify another filter</h3> :
        foundCountries.map((data, index) => {
          return (
            <div key={index}>
              <h3 >{data.name}
                <button onClick={() => setClickedIndex(index)}>show</button>
                {clickedIndex === index && <ShowCountryDetail country={foundCountries[clickedIndex]} />}
              </h3>
            </div>
          )
        })}

    </div>
  )
}

function App() {

  const [countries, setCountries] = useState([])
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

  const findCountries = (event) => {
    setFindName(event.target.value)
    console.log(findName)
  }

  const foundCountries = countries.filter(data => data.name.toUpperCase().includes(findName.toUpperCase()))

  return (
    <div>
      <form>
        find countries <input value={findName} onChange={findCountries} />
      </form>
      {findName.length > 0 && foundCountries.length > 0 && <ShowCountries foundCountries={foundCountries} />}
    </div>
  )
}

export default App;
