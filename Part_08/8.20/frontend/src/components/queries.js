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
  query allBooks($genre:String){
    allBooks(genre:$genre){
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



