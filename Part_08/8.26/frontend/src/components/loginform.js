import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './queries'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      props.notify(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      const userFovoriteGenre = result.data.login.userFavoriteGenre
      props.loginHandler(token , userFovoriteGenre)
      localStorage.setItem('book-user-favoriteGenre' , userFovoriteGenre)
      localStorage.setItem('book-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <div style = {{marginTop:50}}>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button style = {{marginTop:10}} type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm