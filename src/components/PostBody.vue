<template>
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
</template>

<script setup>
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'radix-vue'
const {post} = defineProps(['post'])
</script>

<style scoped></style>
