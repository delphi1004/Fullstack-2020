const logger = require('./utils/logger')
const config = require('./utils/config')
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { assertValidExecutionArguments } = require('graphql/execution/execute')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const pubsub = new PubSub()

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
    userFavoriteGenre:String!
  }

  type Author{
    name:String!
    born:Int
    bookCount:Int
  }

  type Subscription {
    bookAdded: Book!
  }

  type Query{
    me: User
    bookCount : Int!
    authorCount : Int!
    allAuthors: [Author!]!
    allBooks: [Book!]!
    allGenres: [String!]
    booksByGenre(genre:String!) : [Book!]!
    findBookByAuthor(name:String) : [Book!]
    findBookByTitle(title:String!) :[Book!]
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      authorBorn: Int
      genres: [String!]!
    ):Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.countDocuments(),
    me: (root, args, context) => {
      return context.currentUser
    },
    allAuthors: async (root, args, context) => {

      const authors = await Author.find({})

      return authors.map(author => {
        author.bookCount = Book.find({ author: { $in: author.id } }).countDocuments()
        return author
      })
    },

    allBooks: async (root, args, context) => {
      try {
        return await Book.find({}).populate('author')
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    allGenres: async (root, args, context) => {
      try {
        const books = await Book.find({})
        const genres = ([...new Set([].concat.apply([], books.map(book => book.genres)))])
        return genres
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    booksByGenre: async (root, args, context) => {
      console.log(args)
      try {
        if (args.genre) {
          return await Book.find({ genres: { $in: args.genre } }).populate('author')
        } else {
          return await Book.find({}).populate('author')
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    findBookByAuthor: async (root, args, context) => {

      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        const author = await Author.findOne({ name: { $in: args.name } })
        if (!author) throw new UserInputError(`can't find the author ${args.name}`)

        const books = await Book.find({ author: { $in: author.id } }).populate('author')
        if (!books) throw new UserInputError(`can't find a book by author ${args.name}`)

        return books
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    findBookByTitle: async (root, args, context) => {

      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        const book = await Book.find({ title: { $in: args.title } }).populate('author')
        if (book.length == 0) throw new UserInputError(`can't find the book ${args.title}`)
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let author, book

      console.log(args)

      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (args.genres.length <= 0) {
        throw new UserInputError('you missed genres')
      }

      try {
        author = await Author.findOne({ name: args.author })
        book = await Book.findOne({ title: args.title })

        if (!book) {
          if (!author) {
            author = new Author({
              name: args.author,
            })
            await author.save()
          }
          book = new Book({ ...args, author: author })
          await book.save()
        } else {
          throw new UserInputError(`${args.title} is already saved in DB`)
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      
      return book
    },
    editAuthor: async (root, args, context) => {

      console.log(args)

      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) throw new UserInputError(`can't find the author ${args.name}`)
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
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      try {
        return await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== '1234') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET), userFavoriteGenre: user.favoriteGenre }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs, resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})