import React, { useState, useEffect } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from './queries'
import Select from "react-select"
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [authors, setAuthors] = useState()
  const [selectedUser, setSelectedUser] = useState('')
  const [authorsForSelect, setAuthorsForSelect] = useState()
  const [bornYear, setBornYear] = useState('')
  const [UpdateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      props.notify(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (!result.loading) {
      setAuthors(result.data.allAuthors)
      setAuthorsForSelect(result.data.allAuthors.map(author => {
        return { value: author.name, label: author.name }
      }))
    }
  }, [result])

  if (result.loading && props.show) {
    return <div>loading...</div>
  }

  if (!props.show || !authors) {
    return null
  }

  const updateAuthor = (event) => {
    event.preventDefault()
    console.log(`update author...${selectedUser.label} , ${bornYear}`)
    UpdateAuthor({ variables: { name: selectedUser.label, setBornTo: parseInt(bornYear) } })
    setBornYear('')
  }

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
    { props.userLoggedIn &&
      <form onSubmit={updateAuthor}>
        <div>
          <br />
          <h3>Set birthyear</h3>
          <div style={{ marginBottom: 10 }}>
            Name
              <div style={{ width: 300 }}>
              <Select
                defaultValue={selectedUser}
                onChange={setSelectedUser}
                options={authorsForSelect}
              />
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            Born
        <input type='number' value={bornYear} onChange={({ target }) => setBornYear(target.value)} />
          </div>
          <button type='submit'>update author</button>
        </div>
      </form>
    }
  </div>
)
}

export default Authors