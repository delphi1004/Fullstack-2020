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
      const dataInStore = store.readQuery({ query: BOOKS_BY_GENRE, variables: { genre: props.userFavoriteGenre } })
      if (response.data.addBook.genres.includes(props.userFavoriteGenre)) {
        store.writeQuery({
          query: BOOKS_BY_GENRE,
          variables: { genre: props.userFavoriteGenre },
          data: {
            ...dataInStore,
            booksByGenre: [...dataInStore.booksByGenre, response.data.addBook]
          }
        })
      }

      const dataAllBooksInStore = store.readQuery({ query: BOOKS_BY_GENRE, variables: { genre: '' } })
      store.writeQuery({
        query: BOOKS_BY_GENRE,
        variables: { genre: '' },
        data: {
          ...dataAllBooksInStore,
          booksByGenre: [...dataAllBooksInStore.booksByGenre, response.data.addBook]
        }
      })

      if (response.data.addBook.genres.includes(props.selectedGenre)) {
        const dataSelectedBooksInStore = store.readQuery({ query: BOOKS_BY_GENRE, variables: { genre: props.selectedGenre } })
        store.writeQuery({
          query: BOOKS_BY_GENRE,
          variables: { genre: props.selectedGenre },
          data: {
            ...dataSelectedBooksInStore,
            booksByGenre: [...dataSelectedBooksInStore.booksByGenre, response.data.addBook]
          }
        })
      }
    },

    onError: (error) => {
      props.notify(error.graphQLErrors[0].message)
    },

  })

  if (!props.show) {
    return null
  }

  const submit =  (event) => {
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