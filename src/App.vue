<script setup>
import {onMounted} from 'vue'
import {usePostStore} from '@/stores/posts'
const store = usePostStore()
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
      <div class="p-1 basis-3/12">title</div>
      <div class="p-1 basis-3/12">email</div>
      <div class="p-1 basis-5/12">body</div>
    </div>
    <div class="w-2xl max-h-96 overflow-y-auto">
      <div class="flex justify-between border-b border-gray-300 w-full" v-for="post in store.showingPosts">
        <div class="p-1 basis-1/12">{{ post.id }}</div>
        <div class="p-1 basis-3/12">{{post.title}}</div>
        <div class="p-1 basis-3/12">{{post.email}}</div>
        <div class="p-1 basis-5/12">{{post.short}}...</div>
      </div>
    </div>
  </main>
</template>

<style>
@import 'tailwindcss';
</style>
