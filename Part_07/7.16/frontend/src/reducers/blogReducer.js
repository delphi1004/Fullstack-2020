import BlogService from '../services/blogs'
import { loadAllUser } from '../reducers/usersReducer'

export const loadBlog = (blogID) => {
  return async dispatch => {
    const blog = await BlogService.getBlog(blogID)
    dispatch(
      {
        type: 'BLOG_LOADDED',
        blog
      }
    )
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const addedBlog = await BlogService.addNewBlog(blog)
    dispatch(loadAllUser())
    dispatch(
      {
        type: 'BLOG_ADDED',
        addedBlog
      }
    )
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await BlogService.removeBlog(blog)
    dispatch(loadAllUser())
    dispatch(
      {
        type: 'BLOG_REMOVED',
      }
    )
  }
}

export const updateBlog = (blogToUpdate) => {
  return async dispatch => {
    const updatedBlog = await BlogService.updateBlog(blogToUpdate)
    dispatch(
      {
        type: 'BLOG_UDATES',
        updatedBlog
      }
    )
  }
}

const blogReducer = (state = null, action) => {
  switch (action.type) {
    case 'BLOG_LOADDED':
      return action.blog
    case 'BLOG_ADDED':
      return action.addedBlog
    case 'BLOG_REMOVED':
      return null
    case 'BLOG_UDATES':
      return action.updatedBlog
    default:
  }

  return state
}

export default blogReducer

