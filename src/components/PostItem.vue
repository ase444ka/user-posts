<template>
  <div class="flex justify-between border-b border-gray-300 w-full" ref="item">
    <div class="p-1 basis-1/12">{{ post.id }}</div>
    <div class="p-1 basis-4/12">{{ post.title }}</div>
    <div
      class="p-1 basis-3/12 cursor-pointer"
      @click="$emit('emailClick', post)"
      :class="visitedOrNotClass"
    >
      {{ post.email }}
    </div>
    <PostBody :short="post.short" :body="post.body" />
  </div>
</template>

<script setup>
import {useTemplateRef, watch, onBeforeUnmount, computed} from 'vue'
import {useStateStore} from '@/stores/state'
import PostBody from '@/components/PostBody.vue'
const {post} = defineProps(['post'])
const item = useTemplateRef('item')
const stateStore = useStateStore()
function setTop() {
  setTimeout(stateStore.setTop, 300)
}
const visitedOrNotClass = computed(() => post.visited ? 'text-amber-950 italic' : '')
watch(item, value => {
  value.addEventListener('mouseenter', setTop)
})
onBeforeUnmount(() => item.value.removeEventListener('mouseenter', setTop))
</script>

<style scoped></style>
