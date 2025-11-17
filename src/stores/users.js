import {ref} from 'vue'
import {defineStore} from 'pinia'
import api from '@/api/users'
import {usePostStore} from './posts'

export const useUserStore = defineStore('users', () => {
  const users = ref({})
  const currentUser = ref({})

  async function getUsers() {
    const data = await api.getUsers()
    users.value = data
  }

  async function setCurrentUser(post) {
    const user = users.value.find(user => user.id === post.userId)
    currentUser.value = {
      ...user,
      href: `https://www.${user.website}`,
      work: user.company.name,
      fullAddress: `${user.address.street}, ${user.address.suit}, ${user.address.city}`,
    }
  }

  function resetCurrentUser() {
    currentUser.value = {}
  }

  return {currentUser, users, getUsers, setCurrentUser, resetCurrentUser}
})
