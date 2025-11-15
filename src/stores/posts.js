import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {useUserStore} from './users'
import api from '@/api/posts'

export const usePostStore = defineStore('posts', () => {
  const userStore = useUserStore()
  const posts = ref([])

  const showingPosts = computed(() =>
    posts.value.map(post => ({
      id: post.id,
      title: post.title,
      email: userStore.users.find(user => user.id === post.userId).email,
      short: post.body.slice(0, 30),
      text: post.body,
    })),
  )
  async function getPosts() {
    await userStore.getUsers()
    const data = await api.getPosts()
    posts.value = data
  }

  return {posts, showingPosts, getPosts}
})
