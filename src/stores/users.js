import {ref, onBeforeUnmount, computed} from 'vue'
import {defineStore} from 'pinia'
import api from '@/api/users'
import storage from '@/utils/localStorage'

const STORAGE_VARCHAR = 'user-ids'

export const useUserStore = defineStore('users', () => {
  const rawUsers = ref([])
  const currentUser = ref({})
  const ids = ref(new Set(storage.get(STORAGE_VARCHAR)))

  async function getUsers() {
    rawUsers.value = await api.getUsers()
  }

  const users = computed(() =>
    rawUsers.value.map(user => ({
      ...user,
      visited: ids.value.has(user.id + ''),
    })),
  )

  async function setCurrentUser(post) {
    const user = rawUsers.value.find(user => user.id === post.userId)
    ids.value.add(user.id + '')
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

  onBeforeUnmount(() => {
    storage.set(STORAGE_VARCHAR, Array.from(ids.value))
  })

  return {currentUser, users, getUsers, setCurrentUser, resetCurrentUser}
})
