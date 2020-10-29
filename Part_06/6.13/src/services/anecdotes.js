import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  // console.log(res.data)
  return res.data
}

export default { getAll }
