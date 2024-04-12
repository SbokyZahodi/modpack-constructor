<script lang='ts' setup>
import { ToggleDarkMode } from '~/features/ToggleDarkMode'
</script>

<template>
  <div class="p-4">
    <UContainer class="flex justify-end items-center lg:justify-center">
      <div class="flex gap-2">
        <ToggleDarkMode color="white" class="center rounded-xl size-12" />

        <a href="https://github.com/SbokyZahodi/modpack-constructor">
          <UButton color="white" class="size-12 center rounded-xl text-3xl" icon="uil:github" />
        </a>
      </div>
    </UContainer>
  </div>
</template>
