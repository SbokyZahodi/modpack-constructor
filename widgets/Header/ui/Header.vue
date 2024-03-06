<script lang='ts' setup>
import { ToggleDarkMode } from '~/features/ToggleDarkMode'
</script>

<template>
  <div class="p-4">
    <UContainer class="flex justify-end lg:justify-center items-center">
      <div class="flex gap-2">
        <ToggleDarkMode color="white" class="size-12 center rounded-xl" />

        <UButton color="white" class="size-12 center rounded-xl text-3xl" icon="uil:github" />
      </div>
    </UContainer>
  </div>
</template>
