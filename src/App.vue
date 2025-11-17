<script setup>
import PostItem from '@/components/PostItem.vue'
import UserModal from '@/components/UserModal.vue'
import {onMounted, useTemplateRef, ref} from 'vue'
import {usePostStore} from '@/stores/posts'
import {useStateStore} from '@/stores/state'
import {useUserStore} from '@/stores/users'
import SortIcon from '@/icons/IconSort.vue'

const postStore = usePostStore()
const stateStore = useStateStore()
const userStore = useUserStore()
onMounted(postStore.getPosts)
const tableRef = useTemplateRef('table')
const open = ref(false)
function handleScroll(e) {
  if (e.target.scrollHeight === e.target.clientHeight + e.target.scrollTop) {
    stateStore.page()
  }
}
function handleEmailClick(post) {
  userStore.setCurrentUser(post)
  open.value = true
}

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
  <UserModal v-model="open" />
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
        v-if="postStore.showingPosts.length"
        class="w-2xl max-h-96 overflow-y-auto"
        @scroll="handleScroll"
      >
        <TransitionGroup name="list">
          <PostItem
            v-for="post in postStore.showingPosts"
            :key="id"
            :post="post"
            @emailClick="handleEmailClick(post)"
          />
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
