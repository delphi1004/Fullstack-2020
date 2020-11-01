/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const getAll = async (baseUrl) => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject,baseUrl) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (id, newObject,baseUrl) => {
  const response = await axios.put(`${ baseUrl } /${id}`, newObject)
  return response.data
}

export default { getAll, create, update }