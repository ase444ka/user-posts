<script setup>
import TableSkeleton from '@/components/TableSkeleton.vue'
import PostList from '@/components/PostList.vue'
import {onMounted, ref} from 'vue'
import {usePostStore} from '@/stores/posts'
import {useStateStore} from '@/stores/state'
import SortIcon from '@/icons/IconSort.vue'

const postStore = usePostStore()
const stateStore = useStateStore()
onMounted(postStore.getPosts)

const currentSorting = ref(null)

function sortPosts(field) {
  postStore.sort(field)
  tableRef.value.scrollTop = 0
  currentSorting.value = field
}

function getClass(value) {
  return currentSorting.value === value ? '' : 'text-amber-300'
}
</script>

<template>
  <header class="flex mt-5 mx-auto gap-2 max-w-2xl justify-between">
    <h1>People's blog</h1>
    <label for="search">
      search
      <input type="text" id="search" />
    </label>
  </header>
  <main class="mt-5 mx-auto w-fit">
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
    <TableSkeleton v-if="stateStore.loading" />
    <PostList />
  </main>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10);
}
</style>
