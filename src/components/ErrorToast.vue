<script setup>
import {ref, watch, computed} from 'vue'
import {useStateStore} from '@/stores/state'
import {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from 'radix-vue'
import IconClose from '@/icons/IconClose.vue';
const open = ref(false)
const stateStore = useStateStore()

const message = computed(() => stateStore.error ? stateStore.error : '')

watch(message, message => {
  if (!message) return
  open.value = true
  setTimeout(() => {
    open.value = false
    stateStore.resetError()
  }, 30000)
})
</script>

<template>
  <ToastProvider>
    <ToastRoot :open="open" class="p-5 bg-amber-200 text-amber-950 rounded-md fixed top-1/4 left-1/2 shadow-md shadow-red-400 data-[state=open]:animate-[showToast_1s_ease] data-[state=closed]:animate-[hideToast_1s_ease]">
      <ToastDescription>Error: {{message}}</ToastDescription>
      <ToastClose class="absolute top-1 right-1  active:scale-90" @click="open=false">
        <IconClose />
      </ToastClose>
    </ToastRoot>

    <ToastViewport />
  </ToastProvider>
</template>
<style>
@keyframes showToast {
  0% {
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes hideToast {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px);
    opacity: 0;
  }
}
</style>
