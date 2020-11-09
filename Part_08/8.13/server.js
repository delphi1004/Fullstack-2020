const logger = require('./utils/logger')
const config = require('./utils/config')
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const { assertValidExecutionArguments } = require('graphql/execution/execute')

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
  }

  type Query{
    bookCount : Int!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      authorBorn: Int!
      genres: [String!]!
    ):Book
  }
`
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({name:args.author})
      let book = await Book.findOne({title:args.title})

      console.log(author , book)

      if (!author) {
        author = new Author({
          name: args.author,
          born: args.authorBorn
        })
        await author.save()
      }

      if(!book){
        book = new Book({ ...args, author: author })
      }else{
        book.author = author
      }

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    }
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

