import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useStateStore = defineStore('state', () => {
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)

  function setLoading(status) {
    loading.value = status
  }
  function setError(message) {
    error = message
  }
  function resetError() {
    error = null
  }
  function page() {
    currentPage.value++
  }
  function resetPage() {
    currentPage.value = 1
  }

  return {
    loading,
    error,
    currentPage,
    setLoading,
    setError,
    resetError,
    page,
    resetPage,
  }
})
