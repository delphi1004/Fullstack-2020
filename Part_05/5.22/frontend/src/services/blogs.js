import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const req = await axios.get(baseUrl)
    return req.data
}

const getUserBlog = async (userId) => {
    const config = {
        headers: { Authorization: token },
    }
    const req = await axios.get(baseUrl + '/' + userId, config)
    return req.data
}

const addNewBlog = async (blog) => {
    const config = {
        headers: { Authorization: token },
    }

    const res = await axios.post(baseUrl, blog, config)
    return res.data
}

const updateBlog = async (blog) => {
    const config = {
        headers: { Authorization: token },
    }

    const res = await axios.put(baseUrl + '/' +blog.id, blog, config)
    return res.data
}

const removeBlog = async (blog) => {
    const config = {
        headers: { Authorization: token },
    }

    const res = await axios.delete(baseUrl + '/' +blog.id, config)
    return res.data
}

export default { getAll, getUserBlog, setToken, addNewBlog, updateBlog ,removeBlog }