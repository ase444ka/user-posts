<template>
  <div class="relative">
    <UserModal v-model="open" />

    <div
      ref="table"
      class="w-2xl max-h-96 overflow-y-auto"
      @scroll="handleScroll"
    >
      <PostItem
        v-for="post in postStore.showingPosts"
        :key="post.id"
        :post="post"
        @emailClick="handleEmailClick(post)"
      />
    </div>
    <Transition>
      <button
        class="absolute bottom-1.5 right-1.5 rounded-full bg-amber-300 grid place-items-center p-3.5 pt-2.5 pl-2.5"
        type="button"
        @click="stateStore.resetPage"
        v-if="stateStore.currentPage > 1"
      >
        <IconUp class="text-amber-950" />
      </button>
    </Transition>
  </div>
</template>

<script setup>
import UserModal from '@/components/UserModal.vue'
import {useTemplateRef, ref, computed, watch} from 'vue'
import PostItem from '@/components/PostItem.vue'
import {usePostStore} from '@/stores/posts'
import {useStateStore} from '@/stores/state'
import {useUserStore} from '@/stores/users'
import IconUp from '@/icons/IconUp.vue'
const postStore = usePostStore()
const stateStore = useStateStore()
const userStore = useUserStore()

const isReset = computed(() => stateStore.isTableReset)

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

watch(isReset, value => {
  console.log('watch ', value)
  value && (tableRef.value.scrollTop = 0)
})
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
