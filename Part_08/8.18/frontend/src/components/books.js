import React, { useState ,useEffect} from 'react'
import { ALL_BOOKS } from './queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState()

  useEffect(() => {
    if (!result.loading) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (result.loading && props.show) {
    return <div>loading...</div>
  }

  if (!props.show || !books) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table style={{ textAlign: 'left' }}>
        <tbody>
          <tr style={{ height: 50 }}>
            <th width='500'></th>
            <th width='200'>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
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

export default Books