import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {useUserStore} from './users'
import {useStateStore} from './state'
import api from '@/api/posts'

export const usePostStore = defineStore('posts', () => {
  const userStore = useUserStore()
  const stateStore = useStateStore()
  const posts = ref([])
  const filter = ref('')
  const filteredPosts = computed(() =>
    posts.value.filter(p => p.body.includes(filter.value)).map(post => {
      const user = userStore.users.find(user => user.id === post.userId)
      return {
      ...post,
      email: user.email,
      visited: user.visited,
      short: post.body.slice(0, 30),
    }}),
  )

  const showingPosts = computed(() =>
    filteredPosts.value.slice(0, stateStore.currentPage * 30),
  )
  async function getPosts() {
    try {
      stateStore.setLoading(true)
      await userStore.getUsers()
      posts.value = await api.getPosts()

    } catch (err) {
      stateStore.setError(err.message)
    } finally {
      stateStore.setLoading(false)
    }
  }

  async function searchPosts(string) {
    filter.value = string
  }

  function sort(fieldName) {
    stateStore.resetPage()
    posts.value.sort((a, b) => (a[fieldName] > b[fieldName] ? 1 : -1))
  }

  return {
    posts,
    showingPosts,
    filteredPosts,
    getPosts,
    searchPosts,
    sort,
    filter,
  }
})
