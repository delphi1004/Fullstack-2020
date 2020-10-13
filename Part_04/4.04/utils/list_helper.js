const dummy = (blogs) => {
    // ...

    return 1
  }
  


const totalLikes = (blogs) =>{
    let total = 0

    console.log(typeof blogs)

    blogs.forEach(blog =>{
        total += blog.likes
    })

    return total
}

module.exports = {
    dummy,totalLikes
  }