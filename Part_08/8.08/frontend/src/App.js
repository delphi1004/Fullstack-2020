import React, { useState } from 'react'
import './App.css';
import Authors from './components/authors'
import Books from './components/books'
import NewBook from './components/newbook'

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div style = {{marginLeft:20 , marginTop:50}}>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add')}>Add book</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )



}

export default App;
