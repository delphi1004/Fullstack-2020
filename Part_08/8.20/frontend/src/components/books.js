import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from './queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState()
  const [genres, setGenres] = useState([])
  const [selectedGenre , setSelectedGenre] = useState('all')

  useEffect(() => {
    if (!result.loading) {
      setBooks(result.data.allBooks)
      const tempGenres = result.data.allBooks.map(book => book.genres)
      tempGenres.push('all')
      setGenres([...new Set([].concat.apply([], tempGenres))])
    }
  }, [result])

  if (result.loading && props.show) {
    return <div>loading...</div>
  }

  if (!props.show || !books) {
    return null
  }

  const handleGenre = (event) => {
    setSelectedGenre(event.target.innerText)
  }

  return (
    <div>
      <h2>books by <i>{selectedGenre} genre</i></h2>
      {genres.map(genre => (
        <button style = {{borderWidth:0.5 , marginRight:3}} key={genre} onClick={event => handleGenre(event)}>{genre}</button>
      ))
      }

      <table style={{ textAlign: 'left'  , marginTop:20}}>
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
          {books.map(a => {
            if (a.genres.includes(selectedGenre) || selectedGenre === 'all'){
              return (
                <tr key={a.title} style={{ height: 25 }}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
              )
            }else{
              return null
            }
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Books