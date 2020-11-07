import React, { useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from './queries'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [bornYear, setBornYear] = useState('')
  const [UpdateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const updateAuthor = async (event) => {
    event.preventDefault()
    console.log('update author...')
    UpdateAuthor({ variables: { name, setBornTo: parseInt(bornYear) } })
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table style={{ textAlign: 'left' }}>
        <tbody>
          <tr style={{ height: 50 }}>
            <th width='180'></th>
            <th width='70'>
              born
            </th>
            <th width='50'>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name} style={{ height: 25 }}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={updateAuthor}>
      <div>
        <br />
        <h3>Set birthyear</h3>
        <div>
          Name
        <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          Born
        <input type='number' value={bornYear} onChange={({ target }) => setBornYear(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </div>
    </form>
    </div>
  )
}

export default Authors