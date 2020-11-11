/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { ALL_GENRES, BOOKS_BY_GENRE } from './queries'
import { useQuery, useLazyQuery } from '@apollo/client'

const Books = (props) => {
  const result = useQuery(ALL_GENRES)
  const [getBookByGenre, resultBookByGenre] = useLazyQuery(BOOKS_BY_GENRE)
  const [books, setBooks] = useState()
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [initLoad , setInitLoad] = useState(true)

  useEffect(() => {
    if (result.data !== undefined) {
      const genres = [...result.data.allGenres]
      genres.push('all')
      setGenres(genres)
    }

    if(initLoad){
      getBookByGenre({ variables: { genre: '' } })
      setInitLoad(false)
    }

    if (resultBookByGenre.data !== undefined) {
      console.log('loading a book list is done')
      setBooks(resultBookByGenre.data.booksByGenre)
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
      props.setSelectedGenre(event.target.innerText)
    } else {
      console.log('load all books')
      getBookByGenre({ variables: { genre: '' } })
      props.setSelectedGenre('')
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