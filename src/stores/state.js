import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useStateStore = defineStore('state', () => {
  const loading = ref(false)
  const error = ref(null)

  function setLoading(status) {
    loading.value = status
  }
  function setError(message) {
    error = message
  }
  function resetError() {
    error = null
  }

  return {loading, error, setLoading, setError, resetError}
})
