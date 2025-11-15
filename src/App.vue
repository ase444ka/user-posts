<script setup>
import {onMounted} from 'vue'
import {usePostStore} from '@/stores/posts'
import {useStateStore} from '@/stores/state'
const store = usePostStore()
const stateStore = useStateStore()
onMounted(store.getPosts)
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
      <div class="p-1 basis-1/12">id</div>
      <div class="p-1 basis-4/12">title</div>
      <div class="p-1 basis-3/12">email</div>
      <div class="p-1 basis-4/12">body</div>
    </div>
    <div
      class="w-2xl h-8 border-b border-gray-300 flex items-center"
      v-if="stateStore.loading"
      v-for="n in 30"
    >
      <div class="h-7 w-full bg-gray-200 animate-pulse"></div>
    </div>
    <Transition>
      <div  v-if="store.showingPosts.length" class="w-2xl max-h-96 overflow-y-auto">
        <div
          class="flex justify-between border-b border-gray-300 w-full"
          v-for="post in store.showingPosts"
        >
          <div class="p-1 basis-1/12">{{ post.id }}</div>
          <div class="p-1 basis-4/12">{{ post.title }}</div>
          <div class="p-1 basis-3/12 cursor-pointer">{{ post.email }}</div>
          <div class="p-1 basis-4/12 cursor-pointer">{{ post.short }}...</div>
        </div>
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
</style>
