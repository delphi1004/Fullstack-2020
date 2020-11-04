import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async credentials => {
  const res = await axios.get(baseUrl, credentials)
  return res.data
}

export default { getAllUsers }