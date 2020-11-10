/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import './App.css';
import Authors from './components/authors'
import Books from './components/books'
import NewBook from './components/newbook'
import Login from './components/loginform'
import Recommend from './components/recommend'

const App = () => {
  const [page, setPage] = useState('')
  const [token, setToken] = useState(null)
  const [userFavoriteGenre, setUserFavoriteGenre] = useState()
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('book-user-token')
    const userFavoriteGenre = localStorage.getItem('book-user-favoriteGenre')
    setUserFavoriteGenre(userFavoriteGenre)
    setToken(token)
    setPage('recommend')
  }, [])

  const notify = (error) => {
    console.log(error)
  }

  const logout = () => {
    setToken(null)
    setUserFavoriteGenre('')
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const loginHandler = (token, userFavoriteGenre) => {
    setToken(token)
    setUserFavoriteGenre(userFavoriteGenre)
    setPage('recommend')
  }

  return (
    <div style={{ marginLeft: 20, marginTop: 50 }}>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token &&
          <button onClick={() => setPage('add')}>Add book</button>
        }
        {token &&
          <button onClick={() => setPage('recommend')}>Recommend</button>
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

      <Recommend
        show={page === 'recommend'} userFavoriteGenre = {userFavoriteGenre}
      />

      <Login
        show={page === 'login'} setError={notify} loginHandler={loginHandler}
      />

    </div>
  )
}

export default App;
