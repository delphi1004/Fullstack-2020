import React, { useState } from 'react'
import BlogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogUpdatedHandler, blogRemovedHandler, setNotificationMessage, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [showDetail, setShowDetail] = useState(false)

    const handleUpdate = async (blog) => {
        const blogToUpdate = {
            author: blog.author,
            id: blog.id,
            likes: blog.likes + 1,
            title: blog.title,
            url: blog.url,
            user: blog.user
        }

        try {
            const updatedBlog = await BlogService.updateBlog(blogToUpdate)
            blogUpdatedHandler(updatedBlog)
        } catch (exception) {
            setNotificationMessage(exception.response.data.error)
        }
    }

    const handleRemove = async (blog) => {

        if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
            try {
                await BlogService.removeBlog(blog)
                setNotificationMessage(`${blog.title} removed`)
                blogRemovedHandler(blog)
            } catch (exception) {
                setNotificationMessage(exception.response.data.error)
            }
        }
    }

    return (
        <div style={blogStyle}>
            <h3>{blog.title}, {blog.author}
                <button onClick={() => setShowDetail(!showDetail)}> {showDetail ? 'hide' : 'view'}</button>
            </h3>

            {showDetail &&
                <div>
                    <h3>{blog.url}</h3>
                    <h3>{blog.likes} <button onClick={() => handleUpdate(blog)}>like</button></h3>
                    <h3>{user}</h3>
                    <button style={{ backgroundColor: 'lightblue', border: 'none' }} onClick={() => handleRemove(blog)}>remove</button>
                </div>
            }
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    blogUpdatedHandler: PropTypes.func.isRequired,
    blogRemovedHandler: PropTypes.func.isRequired,
    setNotificationMessage: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired,
}

export default Blog
