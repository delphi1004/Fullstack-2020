import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = async () =>{
    const request = axios.get(baseUrl)
    try{
        return (await request).data
    }catch (error) {
        throw new Error(error);
    }
}

export default {getAll}