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
        throw new Error(error.response.data.error);
    }
}

const updateData = async (updatedData) =>{

    const url = `${baseUrl}/${updatedData.id}`
    const request = axios.put(url, updatedData)
    try{
        return (await request).data
    }catch (error) {
        throw new Error(error.response.data.error);
    }
}

const deletePerson = async (id) =>{
    const url = `${baseUrl}/${id}`
    const request = axios.delete(url)
    try{
        return (await request).data
    }catch (error) {
        throw new Error(error);
    }
}

export default {getAll , addNewData , updateData , deletePerson}