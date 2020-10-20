import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const getUserBlog = (userId) => {
  const config = {
    headers: { Authorization: token },
  }
  const req = axios.get(baseUrl + '/' + userId, config)
  return req.then(res => res.data)
}

const addNewBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
    body: blog
  }

  const res = await axios.post(baseUrl, blog, config)
  return res.data
}

export default { getAll, getUserBlog, setToken, addNewBlog }