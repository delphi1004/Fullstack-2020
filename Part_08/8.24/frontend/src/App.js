/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useSubscription, useApolloClient  , useLazyQuery} from '@apollo/client'
import './App.css';
import Authors from './components/authors'
import Books from './components/books'
import NewBook from './components/newbook'
import Login from './components/loginform'
import Recommend from './components/recommend'
import { BOOK_ADDED , BOOKS_BY_GENRE} from './components/queries';

const App = () => {
  const [page, setPage] = useState('')
  const [token, setToken] = useState(null)
  const [getBookByGenre, resultBookByGenre] = useLazyQuery(BOOKS_BY_GENRE)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [userFavoriteGenre, setUserFavoriteGenre] = useState()
  const [selectedGenre, setSelectedGenre] = useState('')
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      setNotificationMessage(`${subscriptionData.data.bookAdded.title} added`)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('book-user-token')
    const userFavoriteGenre = localStorage.getItem('book-user-favoriteGenre')
    setUserFavoriteGenre(userFavoriteGenre)
    setToken(token)
    if (token) {
      setPage('recommend')
    } else {
      setPage('')
    }
  }, [])

  const notify = (msg) => {
    setNotificationMessage(msg)
  }

  const ShowNotificaitonMessage = ({ msg, resetMessageHandler }) => {

    if (msg === null) {
        return null
    }

    setTimeout(() => {
        resetMessageHandler(null)
    }, 5000)

    return (
        <div id='notification'>
            <h3 style = {{color:'orange'}}>{msg}</h3>
        </div>
    )
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
      <ShowNotificaitonMessage msg={notificationMessage} resetMessageHandler={setNotificationMessage} />
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
        show={page === 'authors'} userLoggedIn={token} notify={notify}
      />

      <Books
        show={page === 'books'} setSelectedGenre={setSelectedGenre}
      />

      <NewBook
        show={page === 'add'} notify={notify} userFavoriteGenre={userFavoriteGenre} selectedGenre={selectedGenre}
      />

      <Recommend
        show={page === 'recommend'} userFavoriteGenre={userFavoriteGenre}
      />

      <Login
        show={page === 'login'} notify={notify} loginHandler={loginHandler}
      />

    </div>
  )
}

export default App;
