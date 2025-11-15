import axios from 'axios'

export default {
  async getPosts() {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
    )
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(response.statusText)
    }
  },
}
