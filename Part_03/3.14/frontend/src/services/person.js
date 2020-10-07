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

const addNewData = async (newData) =>{
    const request = axios.post(baseUrl, newData)
    try{
        return (await request).data
    }catch (error) {
        throw new Error(error);
    }
}

export default {getAll , addNewData}