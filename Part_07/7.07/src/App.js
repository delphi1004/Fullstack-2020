import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import { useField , useCountry } from './hooks'

const ShowWeather = ({ capitalName }) => {
 
  const [weatherData, setWeatherData] = useState()

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    const weatherQuery = 'http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + capitalName
    axios
      .get(weatherQuery)
      .then(response => {
        console.log(response.data)
        setWeatherData(response.data)
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
  const nameInput = useField('text')
  const country = useCountry(nameInput.value)

  return (
    <div>
      find countries <input {...nameInput} />
      {nameInput.value.length > 0 && country.length > 0 && <ShowCountries foundCountries={country} />}
    </div>
  )
}

export default App;
