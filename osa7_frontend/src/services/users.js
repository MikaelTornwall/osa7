import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  console.log('User data: ', res.data)
  return res.data
}

const getUser = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

export default { getAll, getUser }
