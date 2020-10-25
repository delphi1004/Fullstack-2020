import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent , waitFor } from '@testing-library/react'
import Blog from '../components/blog'
import BlogService from '../services/blogs'
import NewBlogForm from '../components/newblogform'

const user = {
    token: '1234',
    id: '5678',
    name: 'test'
}

const blog = {
    id: '1234567',
    title: "Generative DEsign",
    author: "onformative",
    url: "http://www.generative-gestaltung.de/2/",
    likes: 10,
    user: user.name
}

describe('<Blog />', () => {
    test('blog render only title and author for default rendeing', () => {

        const dummyFunc = jest.fn();
        const component = render(
            <Blog key={blog.id} blog={blog} blogUpdatedHandler={dummyFunc}
                blogRemovedHandler={dummyFunc} setNotificationMessage={dummyFunc} user={user.name} />
        )

        expect(component.container).toHaveTextContent(
            `${blog.title}, ${blog.author}`
        )

        expect(component.container).not.toHaveTextContent(blog.url)
    })

    test('blog render detail information', () => {
        const dummyFunc = jest.fn();
        const component = render(
            <Blog key={blog.id} blog={blog} blogUpdatedHandler={dummyFunc}
                blogRemovedHandler={dummyFunc} setNotificationMessage={dummyFunc} user={user.name} />
        )

        const button = component.container.querySelector('button')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent(
            `${blog.url}${blog.likes}`
        )
    })

    test('like button twice clicked', async () => {
        const dummyFunc = jest.fn();
        const blogUpdatedHandler = jest.fn((blog) => blog)
        BlogService.updateBlog = jest.fn().mockResolvedValue(blog)
        const component = render(
            <Blog key={blog.id} blog={blog} blogUpdatedHandler={blogUpdatedHandler}
                blogRemovedHandler={dummyFunc} setNotificationMessage={dummyFunc} user={user.name} />
        )

        const detailButton = component.container.querySelector('button')
        fireEvent.click(detailButton)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        await waitFor(() =>{
            expect(blogUpdatedHandler.mock.calls).toHaveLength(2)
        })
   
    })

    test('add new blog', async () => {

        const newBlog = {
            title:'test title',
            author:'test author',
            url:'test url'
        }
        const blogAddedHandler = jest.fn()
        const setNotificationHandler = jest.fn()
        BlogService.addNewBlog = jest.fn().mockResolvedValue(newBlog)
        
        const newBlogComponent = render(
            <NewBlogForm blogAddedHandler={blogAddedHandler} setNotificationMessage={setNotificationHandler} />
        )

        const inputTitle = newBlogComponent.container.querySelector('#title')
        const inputAuthor = newBlogComponent.container.querySelector('#author')
        const inputUrl = newBlogComponent.container.querySelector('#url')
        const form = newBlogComponent.container.querySelector('form')

        fireEvent.change(inputTitle, {
            target: { value: newBlog.title }
        })

        fireEvent.change(inputAuthor, {
            target: { value: newBlog.author }
        })

        fireEvent.change(inputUrl, {
            target: { value: newBlog.url }
        })

        fireEvent.submit(form)

        await waitFor(() =>{
            expect(BlogService.addNewBlog.mock.calls).toHaveLength(1)
        })

        const addedBlog = JSON.stringify(blogAddedHandler.mock.calls[0][0])
        expect(addedBlog).toEqual(JSON.stringify(newBlog))
    })
})
