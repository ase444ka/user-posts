<template>
  <header class="flex mt-5 mx-auto gap-2 max-w-2xl justify-between">
    <h1>People's blog</h1>
    <label for="search">
      search
      <input type="text" id="search" v-model="searchString" />
    </label>
    <button type="button" @click="processSearch" :disabled="!searchString">go!</button>
    <button type="button" @click="processClear" v-if="searchString">clear search</button>
    <button type="button" @click="stateStore.resetPage" v-if="stateStore.currentPage > 1">go up</button>
  </header>
</template>

<script setup>
import {ref, computed} from 'vue'
import {usePostStore} from '@/stores/posts'
import {useStateStore} from '@/stores/state'

const postStore = usePostStore()
const stateStore = useStateStore()
const searchString = ref(null)

function processSearch() {
  stateStore.resetPage()
  postStore.searchPosts(searchString.value)
}

function processClear() {
  stateStore.resetPage()
  searchString.value = ''
  postStore.searchPosts('')
}

const clearButtonText = computed(() => searchString.value ? 'clear Search' : 'go to top')
</script>

<style scoped></style>
