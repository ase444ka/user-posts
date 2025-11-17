<template>
  <DialogRoot :open="open">
    <DialogPortal>
      <DialogOverlay
        class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
      />
      <DialogContent
        @interact-outside="handleModalClose"
        @escape-key-down="handleModalClose"
        :user="userStore.currentUser"
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
          {{userStore.currentUser.name}}
        </DialogTitle>
        <DialogDescription
          class="text-mauve11 mt-2.5 mb-5 text-[15px] leading-normal"
        >
          {{userStore.currentUser.username}}
        </DialogDescription>
        <div>{{userStore.currentUser.username}}</div>
        <div>{{userStore.currentUser.email}}</div>
        <a :href="userStore.currentUser.href" target="_blank">{{userStore.currentUser.website}}</a>
        <div>{{userStore.currentUser.work}}</div>
        <div>{{userStore.currentUser.fullAddress}}</div>
        <div class="mt-[25px] flex justify-end">
          <DialogClose as-child>
            <button
              @click="handleModalClose"
              class="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-sm px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              close
            </button>
          </DialogClose>
        </div>
        <DialogClose
          class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-2.5 right-2.5 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Close"
          @click="handleModalClose"
        >
          X
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup>
import {
  DialogClose,
  DialogContent,
  DialogDescription,
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
  userStore.resetCurrentUser()
}
</script>

<style scoped>

</style>
