import {ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import {defineStore} from 'pinia'

export const useStateStore = defineStore('state', () => {
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)
  const isTableReset = ref(false)
  const clientY = ref(0)
  const isTop = ref(false)

  function setY(event) {
    clientY.value = event.clientY
  }

  function setTop() {
    isTop.value = clientY.value < 186
  }

  onMounted(() => {
    document.addEventListener('mousemove', setY)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', setY)
  })


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
    clientY,
    isTop,
    loading,
    error,
    currentPage,
    setLoading,
    setError,
    resetError,
    page,
    resetPage,
    setTop,
    isTableReset,
  }
})
