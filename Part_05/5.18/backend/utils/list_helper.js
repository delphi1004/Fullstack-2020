const _ = require("lodash");

const dummy = (blogs) => {
  // ...

  return 1
}

const totalLikes = (blogs) => {
  let total = 0

  blogs.forEach(blog => {
    total += blog.likes
  })

  return total
}

const favoriteBlog = (blogs) => {

  favorite = blogs.reduce((max, value) => {
    return value.likes > max.likes ? value : max
  })

  delete favorite._id
  delete favorite.url
  delete favorite.__v

  return favorite
}

const mostBlogs = (blogs) => {

  let result = _.chain(blogs)
    .groupBy('author')
    .map((value, key) => {
      return {
        author: key,
        blogs: value.length
      }
    })
    .maxBy(blog => blog.blogs)
    .value()

  return result
}

const mostLikes = (blogs) => {

  let result = _.chain(blogs)
    .groupBy('author')
    .map((value, key) => {
      return {
        author: key,
        likes: _.sumBy(value, 'likes')
      }
    })
    .maxBy(author => author.likes)
    .value()

  return result
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}