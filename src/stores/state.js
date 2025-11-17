import {ref, nextTick } from 'vue'
import {defineStore} from 'pinia'

export const useStateStore = defineStore('state', () => {
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)
  const isTableReset = ref(false)

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
  async function resetPage() {
    isTableReset.value = true
    currentPage.value = 1
    await nextTick()
    isTableReset.value = false
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
    isTableReset,
  }
})
