<template>
  <UserModal v-model="open" />

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
          :key="post.id"
          :post="post"
          @emailClick="handleEmailClick(post)"
        />
      </TransitionGroup>
    </div>
  </Transition>
</template>

<script setup>
import UserModal from '@/components/UserModal.vue'
import {onMounted, useTemplateRef, ref} from 'vue'
import PostItem from '@/components/PostItem.vue'
import {usePostStore} from '@/stores/posts'
import {useStateStore} from '@/stores/state'
import {useUserStore} from '@/stores/users'
const postStore = usePostStore()
const stateStore = useStateStore()
const userStore = useUserStore()

const tableRef = useTemplateRef('table')
const open = ref(false)

function handleEmailClick(post) {
  userStore.setCurrentUser(post)
  open.value = true
}
function handleScroll(e) {
  if (e.target.scrollHeight === e.target.clientHeight + e.target.scrollTop) {
    stateStore.page()
  }
}
</script>

<style>
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
