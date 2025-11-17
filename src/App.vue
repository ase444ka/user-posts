<script setup>
import ListHeader from '@/components/ListHeader.vue'
import TableSkeleton from '@/components/TableSkeleton.vue'
import PostList from '@/components/PostList.vue'
import {onMounted} from 'vue'
import {usePostStore} from '@/stores/posts'
import {useStateStore} from '@/stores/state'

const postStore = usePostStore()
const stateStore = useStateStore()
onMounted(postStore.getPosts)


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
    <ListHeader />
    <TableSkeleton v-if="stateStore.loading" />
    <PostList v-else/>
  </main>
</template>

<style>

</style>
