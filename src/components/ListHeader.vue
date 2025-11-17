<template>
  <div
    class="sticky top-0 bg-amber-200 w-2xl flex justify-between border-b border-b-gray-400"
  >
    <div
      class="p-1 basis-1/12 cursor-auto select-none flex gap-3"
      @click="sortPosts('id')"
    >
      id
      <SortIcon class="flex" :class="getClass('id')" />
    </div>
    <div
      class="p-1 basis-4/12 cursor-auto select-none flex gap-3"
      @click="sortPosts('title')"
    >
      title
      <SortIcon :class="getClass('title')" />
    </div>

    <div
      class="p-1 basis-3/12 cursor-auto select-none flex gap-3"
      @click="sortPosts('email')"
    >
      email
      <SortIcon :class="getClass('email')" />
    </div>
    <div
      class="p-1 basis-4/12 cursor-auto select-none flex gap-3"
      @click="sortPosts('body')"
    >
      body
      <SortIcon :class="getClass('body')" />
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import SortIcon from '@/icons/IconSort.vue'
import {usePostStore} from '@/stores/posts'
import {useStateStore} from '@/stores/state'

const postStore = usePostStore()
const stateStore = useStateStore()

const currentSorting = ref(null)

function sortPosts(field) {
  postStore.sort(field)
  stateStore.resetPage()
  currentSorting.value = field
}

function getClass(value) {
  return currentSorting.value === value ? '' : 'text-amber-300'
}
</script>

<style scoped></style>
