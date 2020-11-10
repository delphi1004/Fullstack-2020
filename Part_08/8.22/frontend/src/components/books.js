/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from './queries'
import { useQuery, useLazyQuery } from '@apollo/client'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [getBookByGenre, resultBookByGenre] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState()
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [initLoad , setInitLoad] = useState(true)

  useEffect(() => {
    if (result.data !== undefined) {
      const tempGenres = result.data.allBooks.map(book => book.genres)
      tempGenres.push('all')
      setGenres([...new Set([].concat.apply([], tempGenres))])
    }

    if(initLoad){
      getBookByGenre()
      setInitLoad(false)
    }

    if (resultBookByGenre.data !== undefined) {
      setBooks(resultBookByGenre.data.allBooks)
    }
  }, [result.data, resultBookByGenre.data])

  if (result.loading && props.show) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const handleGenre = (event) => {
    if (event.target.innerText !== 'all') {
      getBookByGenre({ variables: { genre: event.target.innerText } })
    } else {
      console.log('load all books')
      getBookByGenre()
    }
    setSelectedGenre(event.target.innerText)
  }

  return (
    <div>
      <h2>books in <i>genre {selectedGenre}</i></h2>
      {genres.map(genre => (
        <button style={{ borderWidth: 0.5, marginRight: 3 }} key={genre} onClick={event => handleGenre(event)}>{genre}</button>
      ))
      }

      <table style={{ textAlign: 'left', marginTop: 20 }}>
        <tbody>
          <tr style={{ height: 50 }}>
            <th width='500'>Title</th>
            <th width='200'>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books && books.map(a =>
            <tr key={a.title} style={{ height: 25 }}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Books