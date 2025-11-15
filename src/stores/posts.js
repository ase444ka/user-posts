import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {useUserStore} from './users'
import {useStateStore} from './state'
import api from '@/api/posts'

export const usePostStore = defineStore('posts', () => {
  const userStore = useUserStore()
  const stateStore = useStateStore()
  const posts = ref([])

  const showingPosts = computed(() =>
    posts.value.slice(0, stateStore.currentPage * 30),
  )
  async function getPosts() {
    try {
      stateStore.setLoading(true)
      await userStore.getUsers()
      const data = await api.getPosts()
      posts.value = data.map(post => ({
        id: post.id,
        title: post.title,
        email: userStore.users.find(user => user.id === post.userId).email,
        short: post.body.slice(0, 30),
        body: post.body,
      }))
    } catch (err) {
      stateStore.setError(err.message)
    } finally {
      stateStore.setLoading(false)
    }
  }

  function sort(fieldName) {
    stateStore.resetPage()
    console.log(posts.value[0][fieldName])
    posts.value.sort((a, b) => a[fieldName] > b[fieldName] ? 1 : -1)
  }

  return {posts, showingPosts, getPosts, sort}
})
