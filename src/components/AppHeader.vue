<template>
  <header class="flex mt-5 mx-auto gap-2 max-w-2xl justify-between">
    <h1 class="text-2xl text-amber-950 font-bold">People's blog</h1>
    <div class="relative" @keyup.esc="processClear">
      <IconMagnify class="absolute top-1 left-0 scale-80 text-amber-950" />
      <input
        type="text"
        id="search"
        placeholder="search posts..."
        v-model="searchString"
        class="bg-amber-100 border-0 rounded-md py-1 px-5 outline-0 inline-block"
      />
      <IconClose
        v-if="searchString"
        class="absolute top-1 right-1 scale-80 text-amber-950"
        @click="processClear"
      />
    </div>
  </header>
</template>

<script setup>
import IconClose from '@/icons/IconClose.vue'
import IconMagnify from '@/icons/IconMagnify.vue'
import {ref, computed, watch} from 'vue'
import debounce from 'lodash.debounce'
import {usePostStore} from '@/stores/posts'
import {useStateStore} from '@/stores/state'

const postStore = usePostStore()
const stateStore = useStateStore()
const searchString = ref(null)

function search() {
  console.log('debounce')
  stateStore.resetPage()
  postStore.searchPosts(searchString.value)
}

function processClear() {
  searchString.value = ''
}

const clearButtonText = computed(() =>
  searchString.value ? 'clear Search' : 'go to top',
)

watch(searchString, value => {
  if (value && value.length < 3) {
    return
  }
  debounce(search, 400)()
})
</script>

<style scoped></style>
