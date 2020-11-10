import React from 'react'
import { ALL_BOOKS } from './queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table style = {{textAlign: 'left'}}>
        <tbody>
          <tr style = {{height:50}}>
            <th width = '500'></th>
            <th width = '200'>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title} style = {{height:25}}>
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