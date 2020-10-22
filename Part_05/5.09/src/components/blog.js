import React, { useState } from 'react'
import BlogService from '../services/blogs'

const Blog = ({ blog , blogUpdatedHandler }) => {
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

        const updatedBlog = await BlogService.updateBlog(blogToUpdate)
        blogUpdatedHandler(updatedBlog)
    }

    return (
        <div style={blogStyle}>
            <h3>{blog.title}
                <button onClick={() => setShowDetail(!showDetail)}> {showDetail ? 'hide' : 'view'}</button>
            </h3>

            {showDetail &&
                <div>
                    <h3>{blog.url}</h3>
                    <h3>{blog.likes} <button onClick = {() => handleUpdate(blog)}>like</button></h3>
                    <h3>{blog.author}</h3>
                </div>
            }
        </div>
    )
}

export default Blog
