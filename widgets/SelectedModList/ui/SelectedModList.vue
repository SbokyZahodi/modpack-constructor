<script lang='ts' setup>
const isSlideOpen = ref(false)
</script>

<template>
  <div class="absolute top-0 left-0 h-full w-20" @mouseenter="isSlideOpen = true">
    <USlideover v-model="isSlideOpen" side="left" @click="isSlideOpen = !isSlideOpen">
      <div class="h-full w-full" @mouseleave="isSlideOpen = false">
        MOD LIST
      </div>
    </USlideover>
  </div>
</template>
