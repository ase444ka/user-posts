<template>
  <DialogRoot :open="open">
    <DialogPortal>
      <DialogOverlay
        class="bg-gray-500 opacity-60 fixed inset-0 z-30 data-[state=open]:animate-[backdropShow_0.5s_ease] data-[state=closed]:animate-[backdropHide_0.5s_ease]"
      />
      <DialogContent
        @interact-outside="handleModalClose"
        @escape-key-down="handleModalClose"
        :user="userStore.currentUser"
        class="data-[state=open]:animate-[dialogShow_0.5s_ease] data-[state=closed]:animate-[dialogHide_0.5s_ease] fixed top-[50%] left-[50%] max-h-[85vh] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md p-[25px] shadow-md focus:outline-none z-100 bg-amber-100"
      >
        <DialogTitle class="m-0 font-md font-semibold p-5 text-lg">
          <div class="border-b pb-1.5">
            {{ userStore.currentUser.name }}
          </div>
        </DialogTitle>
        <div class="px-5">
          <div class="pt-2">{{ userStore.currentUser.username }}</div>
          <div class="text-sm text-gray-500">username</div>
          <div class="pt-3">{{ userStore.currentUser.email }}</div>
          <div :class="'pb-3 text-sm text-gray-500'">email</div>
          <a
            class="pt-3 cursor-pointer underline text-amber-900"
            :href="userStore.currentUser.href"
            target="_blank"
            >{{ userStore.currentUser.website }}</a
          >
          <div class="text-sm text-gray-500">website</div>
          <div class="pt-3">{{ userStore.currentUser.work }}</div>
          <div class="text-sm text-gray-500">company name</div>
          <div class="pt-3">{{ userStore.currentUser.fullAddress }}</div>
          <div class="text-sm text-gray-500">company address</div>
        </div>
        <div class="pt-5 flex justify-end">
          <DialogClose as-child>
            <button
              @click="handleModalClose"
              class="p-3 font-semibold focus:outline-none cursor-pointer block active:scale-95"
            >
              close
            </button>
          </DialogClose>
        </div>
        <DialogClose
          class="cursor-pointer absolute top-2.5 right-2.5 rounded-full focus:outline-none active:scale-95 p-2.5 pt-1.5 pl-1.5"
          aria-label="Close"
          @click="handleModalClose"
        >
          <IconClose />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup>
import IconClose from '@/icons/IconClose.vue'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'radix-vue'
import {useUserStore} from '@/stores/users'

const userStore = useUserStore()

const open = defineModel()

function handleModalClose() {
  open.value = false
  setTimeout(userStore.resetCurrentUser, 501)
}
</script>

<style>
@keyframes dialogShow {
  0% {
    transform: translateY(-1000px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes backdropShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.6;
  }
}
@keyframes dialogHide {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-1000px);
  }
}
@keyframes backdropHide {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
  }
}
</style>
