<script setup>
import {onMounted, useTemplateRef, ref} from 'vue'
import {usePostStore} from '@/stores/posts'
import {useStateStore} from '@/stores/state'
import {useUserStore} from '@/stores/users'
import SortIcon from '@/icons/IconSort.vue'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'

const postStore = usePostStore()
const stateStore = useStateStore()
const userStore = useUserStore()
onMounted(postStore.getPosts)
const tableRef = useTemplateRef('table')
const open = ref(false)
function handleScroll(e) {
  if (e.target.scrollHeight === e.target.clientHeight + e.target.scrollTop) {
    stateStore.page()
  }
}
function handleEmailClick(postId) {
  userStore.setCurrentUser(postId)
  open.value = true
}
function handleModalClose() {
  open.value = false
  userStore.resetCurrentUser()
}
const currentSorting = ref(null)

function sortPosts(field) {
  postStore.sort(field)
  tableRef.value.scrollTop = 0
  currentSorting.value = field
}

function getClass(value) {
  return currentSorting.value === value ? '' : 'text-amber-300'
}
</script>

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
      <div
        class="p-1 basis-1/12 cursor-auto select-none flex gap-3"
        @click="sortPosts('id')"
      >
        id
        <SortIcon class="flex" :class="getClass('id')" />
      </div>
      <div
        class="p-1 basis-4/12 cursor-auto select-none flex gap-3"
        @click="sortPosts('title')"
      >
        title
        <SortIcon :class="getClass('title')" />
      </div>

      <div
        class="p-1 basis-3/12 cursor-auto select-none flex gap-3"
        @click="sortPosts('email')"
      >
        email
        <SortIcon :class="getClass('email')" />
      </div>
      <div
        class="p-1 basis-4/12 cursor-auto select-none flex gap-3"
        @click="sortPosts('body')"
      >
        body
        <SortIcon :class="getClass('body')" />
      </div>
    </div>
    <div class="w-2xl h-96 overflow-y-scroll" v-if="stateStore.loading">
      <div
        class="w-full h-8 border-b border-gray-300 flex items-center"
        v-for="n in 20"
      >
        <div class="h-7 w-full bg-gray-200 animate-pulse"></div>
      </div>
    </div>
    <Transition>
      <div
        ref="table"
        v-if="postStore.showingPosts.length"
        class="w-2xl max-h-96 overflow-y-auto"
        @scroll="handleScroll"
      >
        <TransitionGroup name="list">
          <div
            class="flex justify-between border-b border-gray-300 w-full"
            v-for="post in postStore.showingPosts"
            :key="post.id"
          >
            <div class="p-1 basis-1/12">{{ post.id }}</div>
            <div class="p-1 basis-4/12">{{ post.title }}</div>
            <div
              class="p-1 basis-3/12 cursor-pointer"
              @click="handleEmailClick(post.id)"
            >
              {{ post.email }}
            </div>
            <TooltipProvider>
              <TooltipRoot>
                <TooltipTrigger class="p-1 basis-4/12 cursor-pointer">
                  {{ post.short }}...
                </TooltipTrigger>
                <TooltipPortal>
                  <TooltipContent
                    class="w-2xl not-[]:data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade bg-amber-200 select-none rounded-sm px-[15px] py-2.5 text-[15px] leading-none shadow-md will-change-[transform,opacity]"
                    :side-offset="2"
                    align="end"
                  >
                    {{ post.body }}
                    <TooltipArrow class="fill-amber-200" :width="8" />
                  </TooltipContent>
                </TooltipPortal>
              </TooltipRoot>
            </TooltipProvider>
          </div>
        </TransitionGroup>
      </div>
    </Transition>
  </main>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
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
