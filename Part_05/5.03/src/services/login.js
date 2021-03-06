import axios from 'axios'
const baseUrl = '/api/login'

const login = credentials => {
    const res = axios.post(baseUrl, credentials)
    return res.then(res => res.data)
}

export default { login }