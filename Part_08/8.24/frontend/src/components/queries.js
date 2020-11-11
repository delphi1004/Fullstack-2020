import { gql } from '@apollo/client'


export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
      userFavoriteGenre
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors{
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks{
      title
      published
      author{
        name
      }
      genres
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre:String!){
    booksByGenre(genre:$genre){
      title
      published
      author{
        name
      }
      genres
    }
  }
`


export const ADD_BOOK = gql`
mutation AddBook($title: String!, $published: Int! ,$author: String!, , $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title,
    published,
    author{
      name,
      born
    }
    genres
  }
}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title,
      published,
      author{
        name,
        born
      }
    genres
    }
  }
`

export const UPDATE_AUTHOR = gql`
mutation UpdateAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo,
  ) {
    name
    born
  }
}
`



