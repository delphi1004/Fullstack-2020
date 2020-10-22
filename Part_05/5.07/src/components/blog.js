import React, { useState } from 'react'

const Blog = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [showDetail, setShowDetail] = useState(false)

    return (
        <div style={blogStyle}>
            <h3>{blog.title}
                <button onClick={() => setShowDetail(!showDetail)}> {showDetail ? 'hide' : 'view'}</button>
            </h3>

            {showDetail &&
                <div>
                    <h3>{blog.url}</h3>
                    <h3>{blog.likes} <button>like</button></h3>
                    <h3>{blog.author}</h3>
                </div>
            }
        </div>
    )
}

export default Blog
