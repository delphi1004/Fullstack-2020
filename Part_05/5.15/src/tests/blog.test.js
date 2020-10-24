import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/blog'
import BlogService from '../services/blogs'

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

    test('like button twice clicked',  async () => {
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

        await BlogService.updateBlog()
        expect(blogUpdatedHandler.mock.calls).toHaveLength(2)
    })
})
