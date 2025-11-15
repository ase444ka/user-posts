import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/users'

export const useUserStore = defineStore('users', () => {
  const users = ref([])
  const currentUser = ref(null)

  async function getUsers() {
    const data = await api.getUsers()
    users.value = data
  }

  async function setCurrentUser(id) {
    const data = await api.getUser(id)
    currentUser.value = data
  }

  function resetCurrentUser() {
    currentUser.value = null
  }

  return { currentUser, users, getUsers, setCurrentUser, resetCurrentUser }
})
