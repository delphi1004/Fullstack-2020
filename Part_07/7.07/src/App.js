import React, { useState, useEffect } from 'react';
import './App.css';
import { useField, useCountry } from './hooks'
import axios from 'axios'

const ShowWeather = ({ capitalName }) => {

  const [weatherData, setWeatherData] = useState()

  useEffect(() => {
    const source = axios.CancelToken.source();
    const api_key = process.env.REACT_APP_API_KEY
    const weatherQuery = 'http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + capitalName

    axios
      .get(weatherQuery, { cancelToken: source.token })
      .then(response => {
        if (response.data.current !== undefined) {
          setWeatherData(response.data)
        }else{
          setWeatherData(null)
        }
      }).catch(error => {
        console.log(error)
      })

    return () => {
      source.cancel('previous weather request is canceled');
    }

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
      <hr align="left" width="500" />
      <h5>capital {country.capital}</h5>
      <h5>population {country.population.toLocaleString()}</h5>
      <h4>languages</h4>
      <ul>
        {country.languages.map(data => <li key={data.name}>{data.name}</li>)}
      </ul>
      <img src={country.flag} width={100} alt={country.name} />
      <ShowWeather capitalName={country.capital} />
      <hr align="left" width='500' />
    </div>
  )
}

const ShowCountries = ({ foundCountries }) => {

  const [clickedCountry, setClickedIndex] = useState(null)

  useEffect(() => {
    setClickedIndex('')
  }, [foundCountries])

  return (
    <div>
      {foundCountries.length > 10 ? <h3>Too many matches, specify another filter</h3> :
        foundCountries.map((data, index) => {
          return (
            <div key={data.name}>
              <h3 >{data.name}
                <button onClick={() => setClickedIndex(data.name)}>show</button>
                {clickedCountry === data.name && <ShowCountryDetail country={foundCountries[index]} />}
              </h3>
            </div>
          )
        })}

    </div>
  )
}

function App() {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div style={{ paddingTop: 50, paddingLeft: 20 }}>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      { typeof country === typeof undefiend ? <h3>not found...</h3> : <ShowCountries foundCountries={country} />}
    </div>
  )
}

export default App;
