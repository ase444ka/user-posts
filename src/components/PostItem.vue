<template>
  <div class="flex justify-between border-b border-gray-300 w-full">
    <div class="p-1 basis-1/12">{{ post.id }}</div>
    <div class="p-1 basis-4/12">{{ post.title }}</div>
    <div class="p-1 basis-3/12 cursor-pointer" @click="$emit('emailClick', post)">
      {{ post.email }}
    </div>
    <PostBody :short="post.short" :body="post.body" />
  </div>
</template>

<script setup>
import PostBody from '@/components/PostBody.vue'
const {post} = defineProps(['post'])
</script>

<style scoped></style>
