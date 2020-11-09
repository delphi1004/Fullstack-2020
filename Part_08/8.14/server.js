const logger = require('./utils/logger')
const config = require('./utils/config')
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const { assertValidExecutionArguments } = require('graphql/execution/execute')
const book = require('./models/book')

logger.info('connecting to', config.MONGODB_URI)

mongoose.set('useFindAndModify', false)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author{
    name:String!
    born:Int!
    bookCount:Int!
  }

  type Query{
    bookCount : Int!
    authorCount : Int!
    allAuthors: [Author!]!
    findBookByAuthor(name:String) : [Book!]
    findBookByTitle(title:String!) :[Book!]
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      authorBorn: Int!
      genres: [String!]!
    ):Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author
  }
`
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allAuthors: async () => {
      const authors = await Author.find({})

      return authors.map(author => {
        const book = Book.find({ author: { $in: author.id } })
        author.bookCount = book.length
        return author
      })
    },
    findBookByAuthor: async (root, args) => {
      try {
        const author = await Author.findOne({ name: { $in: args.name } })
        const books = await Book.find({ author: { $in: author.id } }).populate('author')
        return books
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    findBookByTitle: async (root, args) => {
      try {
        const book = await Book.find({ title: { $in: args.title } }).populate('author')
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author,book

      try {
        author = await Author.findOne({ name: args.author })
        book = await Book.findOne({ title: args.title })

        if (!book) {
          if (!author) {
            author = new Author({
              name: args.author,
              born: args.authorBorn
            })
            await author.save()
          }
          book = new Book({ ...args, author: author })
          await book.save()
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
  }
}

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs, resolvers
})
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

