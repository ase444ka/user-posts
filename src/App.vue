<script setup>
import ErrorToast from '@/components/ErrorToast.vue'
import AppHeader from '@/components/AppHeader.vue'
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
  <AppHeader />
  <main class="mt-5 mx-auto w-fit">
    <ListHeader />
    <Transition>
      <TableSkeleton v-if="stateStore.loading" />
    </Transition>
    <Transition name="posts">
      <PostList v-if="!stateStore.loading" />
    </Transition>
    <ErrorToast />
  </main>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.posts-enter-active,
.posts-leave-active {
  transition: opacity 1.5s ease-out;
}

.posts-enter-from,
.posts-leave-to {
  opacity: 0;
}
</style>
