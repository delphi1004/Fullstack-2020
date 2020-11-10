/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from './queries'
import { useLazyQuery } from '@apollo/client'

const Recommend = (props) => {
  const [getBookByGenre, result] = useLazyQuery(ALL_BOOKS , { variables: { genre:props.userFavoriteGenre } })
  const [books, setBooks] = useState()

  useEffect(() => {
    if(result.data === undefined){
      getBookByGenre()
    }else{
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre <b>{props.userFavoriteGenre}</b></p>
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
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend