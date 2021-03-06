const { v1: uuid } = require('uuid')
const { ApolloServer, gql } = require('apollo-server')
const { assertValidExecutionArguments } = require('graphql/execution/execute')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Books{
      title : String!
      author : String!
      published : Int!
      genres : [String!]
  }

  type Authors{
    name : String!
    born : Int
    bookCount : Int!
  }

  type Query{
    bookCount : Int!
    authorCount : Int!
    allBooks(author:String , genre:String) : [Books!]
    allAuthors : [Authors!]
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres : [String!]
    ):Books

    editAuthor(
      name: String!
      setBornTo: Int!
    ):Authors
  }
`
const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allAuthors: () => authors,
    allBooks: (root, args) => books.filter(book => {
      if (args.author && args.genre) {
        return book.author === args.author && book.genres.filter(genre => genre === args.genre).length
      } else if (args.author && !args.genre) {
        return book.author === args.author
      } else if (!args.author && args.genre) {
        return book.genres.filter(genre => genre === args.genre).length
      } else {
        return books
      }
    })
  },
  Authors: {
    bookCount: (root) => {
      return books.filter(book => book.author === root.name).length
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      books = books.concat(book)

      if (authors.filter(author => author.name === args.author).length <= 0) {
        const newAuthor = {
          name: args.author,
          id: uuid()
        }
        authors = authors.concat(newAuthor)
      }
      return book
    },
    editAuthor: (root, args) => {
      const index = authors.findIndex(author => author.name === args.name)

      if (index != -1) {
        const author = { ...authors[index], born: args.setBornTo }
        authors.splice(index, 1, author)
        return author
      } else {
        return null
      }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})