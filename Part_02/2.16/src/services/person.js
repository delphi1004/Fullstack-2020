import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () =>{
    const request = axios.get(baseUrl)
    return (await request).data
}

const addNewData = async (newData) =>{
    const request = axios.post(baseUrl, newData)
    return (await request).data
}

export default {getAll , addNewData}