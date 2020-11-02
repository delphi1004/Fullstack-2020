import BlogService from '../services/blogs'

export const loadUserBlog = (user) => {
  return async dispatch => {
    const blogs = await BlogService.getUserBlog(user.id)
    blogs.sort((a, b) => b.likes - a.likes)

    dispatch(
      {
        type: 'LOAD_BLOGS',
        blogs
      }
    )
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const addedBlog = await BlogService.addNewBlog(blog)

    dispatch(
      {
        type: 'ADD_BLOG',
        addedBlog
      }
    )
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await BlogService.removeBlog(blog)

    dispatch(
      {
        type: 'REMOVE_BLOG',
        blog
      }
    )
  }
}

export const updateBlog = (blogToUpdate) => {
  return async dispatch => {
    const updatedBlog = await BlogService.updateBlog(blogToUpdate)

    dispatch(
      {
        type: 'UPDATE_BLOG',
        updatedBlog
      }
    )
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_BLOGS':
      return action.blogs
    case 'ADD_BLOG':
      return state.concat(action.addedBlog)
    case 'REMOVE_BLOG':
    {
      const index = state.findIndex(blog => blog.id === action.blog.id)
      state.splice(index, 1)
      state.sort((a, b) => b.likes - a.likes)
      return state.map(blog => blog)
    }
    case 'UPDATE_BLOG':
    {
      const index = state.findIndex(blog => blog.id === action.updatedBlog.id)
      state.splice(index, 1, action.updatedBlog)
      state.sort((a, b) => b.likes - a.likes)
      return state.map(blog => blog.id !== action.updatedBlog.id ? blog : action.updatedBlog)
    }
    default:
  }

  return state
}

export default blogReducer

