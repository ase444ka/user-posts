<template>
  <TooltipProvider :delayDuration="300">
    <TooltipRoot>
      <TooltipTrigger class="p-1 basis-4/12 cursor-pointer">
        {{ short }}...
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          class="data-[state=delayed-open]:animate-[show_0.2s_ease] data-[state=closed]:animate-[hide_0.2s_ease] w-2xl bg-amber-200 select-none rounded-sm px-[15px] py-2.5 text-[15px] leading-none shadow-md will-change-[transform,opacity]"
          align="end"
          :side="side"
          ref="tooltip"
        >
          {{ body }}
          <TooltipArrow
            class="fill-amber-200"
            :width="15"
            :height="15"
            ref="tooltip"
          />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  useTemplateRef,
  watchEffect,
  watch,
} from 'vue'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'radix-vue'
import {useStateStore} from '@/stores/state'
const {short, body} = defineProps(['short', 'body'])
const tooltip = useTemplateRef('tooltip')
const stateStore = useStateStore()
const side = computed(() => (stateStore.isTop ? 'bottom' : 'top'))
</script>

<style>
@keyframes show {
  from {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: bottom;
  }
  to {
    opacity: 1;
    transform: scaleY(1);
    transform-origin: bottom;
  }
}
@keyframes hide {
  from {
    opacity: 1;
    transform: scaleY(1);
    transform-origin: bottom;
  }
  to {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: bottom;
  }
}
</style>
