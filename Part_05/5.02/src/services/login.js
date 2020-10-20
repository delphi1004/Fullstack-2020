import axios from 'axios'
const baseUrl = '/api/login'

const login = credentials => {
    const response = axios.post(baseUrl, credentials)
    return response.then(response => response.data)
}

export default { login }