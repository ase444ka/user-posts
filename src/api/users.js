import axios from 'axios'

export default {
  async getUsers() {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users`,
    )
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(response.statusText)
    }
  },
  async getUser(id) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    )
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(response.statusText)
    }
  },
}
