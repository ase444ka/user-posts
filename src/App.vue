<script setup>
import {onMounted, useTemplateRef, ref} from 'vue'
import {usePostStore} from '@/stores/posts'
import {useStateStore} from '@/stores/state'
import SortIcon from '@/icons/IconSort.vue'

const store = usePostStore()
const stateStore = useStateStore()
onMounted(store.getPosts)
const tableRef = useTemplateRef('table')
function handleScroll(e) {
  if (e.target.scrollHeight === e.target.clientHeight + e.target.scrollTop) {
    stateStore.page()
  }
}
const currentSorting = ref(null)

function sortPosts(field) {
  store.sort(field)
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
    <div class="w-2xl h-96 overflow-y-scroll" v-if="stateStore.loading">
      <div
        class="w-full h-8 border-b border-gray-300 flex items-center"
        v-for="n in 20"
      >
        <div class="h-7 w-full bg-gray-200 animate-pulse"></div>
      </div>
    </div>
    <Transition>
      <div
        ref="table"
        v-if="store.showingPosts.length"
        class="w-2xl max-h-96 overflow-y-auto"
        @scroll="handleScroll"
      >
        <TransitionGroup name="list">
          <div
            class="flex justify-between border-b border-gray-300 w-full"
            v-for="post in store.showingPosts"
            :key="post.id"
          >
            <div class="p-1 basis-1/12">{{ post.id }}</div>
            <div class="p-1 basis-4/12">{{ post.title }}</div>
            <div class="p-1 basis-3/12 cursor-pointer">{{ post.email }}</div>
            <div class="p-1 basis-4/12 cursor-pointer">{{ post.short }}...</div>
          </div>
        </TransitionGroup>
      </div>
    </Transition>
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
