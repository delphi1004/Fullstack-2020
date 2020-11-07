import React from 'react'
import { ALL_AUTHORS } from './queries'
import { useQuery } from '@apollo/client'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table style = {{textAlign: 'left'}}>
        <tbody>
          <tr style = {{height:50}}>
            <th width = '180'></th>
            <th width = '70'>
              born
            </th>
            <th width = '50'>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name} style = {{height:25}}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors