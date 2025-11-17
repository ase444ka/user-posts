<template>
  <div class="w-2xl h-96 overflow-y-scroll">
    <div
      class="w-full h-8 border-b border-gray-300 flex items-center"
      v-for="n in 20"
    >
      <div class="h-7 w-full bg-gray-200 animate-pulse"></div>
    </div>
  </div>
</template>
