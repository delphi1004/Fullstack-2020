import axios from 'axios'
import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const placeholder = 'type country name'

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    placeholder,
    onChange
  }
}

export const useCountry = (name) => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect', name)
    if (name.length > 0) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(response => {
          setCountries(response.data)
        }).catch(error => {
          console.log(error.response.data.error)
          setCountries(undefined)
        })
    }
  }, [name])

  return countries
}

export const useAnotherHook = () => {
  // ...
}