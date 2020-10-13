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

module.exports = {
  dummy, totalLikes, favoriteBlog
}