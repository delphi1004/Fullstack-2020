import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/blog'

const blog = {
    id: '1234567',
    title: "Generative DEsign",
    author: "onformative",
    url: "http://www.generative-gestaltung.de/2/",
    likes: 10
}

describe('<Blog />', () => {
    test('blog render only title and author for default rendeing', () => {

        const dummyFunc = jest.fn();
        const component = render(
            <Blog key={blog.id} blog={blog} blogUpdatedHandler={dummyFunc}
                blogRemovedHandler={dummyFunc} setNotificationMessage={dummyFunc} user='test' />
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
                blogRemovedHandler={dummyFunc} setNotificationMessage={dummyFunc} user='test' />
        )

        const button = component.container.querySelector('button')
        fireEvent.click(button)

        component.debug()

        expect(component.container).toHaveTextContent(
            `${blog.url}${blog.likes}`
        )
    })
})
