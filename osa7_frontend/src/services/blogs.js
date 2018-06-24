import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
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

export default { getAll, setToken, create, update, remove }
