import React, { useState } from 'react'
import { ADD_BOOK, ALL_GENRES, BOOKS_BY_GENRE } from './queries'
import { useMutation } from '@apollo/client'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [AddBook] = useMutation(ADD_BOOK, {

    refetchQueries: [{ query: ALL_GENRES },
    { query: BOOKS_BY_GENRE, variables: { genre: '' } }],

    update: (store, response) => {
      props.updateCacheWith(response.data.addBook)
    },
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
      props.notify(error.graphQLErrors[0].message)
    },

  })

  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    AddBook({ variables: { title, published: parseInt(published), author, genres } })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>new book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuhtor(target.value)} />
        </div>
        <div>
          published
          <input type='number' value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook