import React, { useState } from 'react'
import BlogService from '../services/blogs'

const NewBlogForm = ({blogAddedHandler, setNotificationMessage }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = async (event) => {
        event.preventDefault()

        try {

            const newBlog = {
                title: title,
                author: author,
                url: url,
            }

            const addedBlog = await BlogService.addNewBlog(newBlog)
            delete addedBlog.user

            setTitle('')
            setAuthor('')
            setUrl('')
            blogAddedHandler(addedBlog)
            setNotificationMessage(`a new blog  ${addedBlog.title} added`)
        } catch (exception) {
            setNotificationMessage(exception.response.data.error)
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleNewBlog}>
                <div>Title: <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} /> </div>
                <div>Author: <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
                <div>Url: <input type='text' value={url} onChange={({ target }) => setUrl(target.value)} /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewBlogForm