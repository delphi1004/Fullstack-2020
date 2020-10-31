import axios from 'axios'
import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}`)
      .then(response => {
        setCountries(response.data)
        console.log("fetch is done", response.data)
      }).catch(error => {
        console.log(error.response.data.error)
      })
  }, [name])

  return countries
}

export const useAnotherHook = () => {
  // ...
}