import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import './App.css';
import Authors from './components/authors'
import Books from './components/books'
import NewBook from './components/newbook'
import Login from './components/loginform'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('book-user-token')
    setToken(token)
  }, [])

  const notify = (error) => {
    console.log(error)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const loginHandler = () => {
    setPage('authors')
  }

  return (
    <div style={{ marginLeft: 20, marginTop: 50 }}>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token &&
          <button onClick={() => setPage('add')}>Add book</button>
        }
        {!token &&
          <button onClick={() => setPage('login')}>Login</button>
        }
        {token &&
          <button onClick={() => logout()}>Logout</button>
        }
      </div>

      <Authors
        show={page === 'authors'} userLoggedIn={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'} setToken={setToken} setError={notify} loginHandler={loginHandler}
      />

    </div>
  )
}

export default App;
