import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('The token is: ', token)
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const res = await axios.post(baseUrl, newObject, config )
  return res.data
}

const update = async (id, newObject) => {
  console.log(id)
  const res = await axios.put(`${baseUrl}/${id}`, newObject)
  return res.data
}

const remove = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

export default { getAll, getById, setToken, create, update, remove }
