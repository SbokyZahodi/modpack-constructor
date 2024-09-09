<script lang='ts' setup>
import type { IModInfo } from '~/shared/api/types/IModInfo'

defineProps<{
  mod: IModInfo
  active: boolean
}>()
</script>

<template>
  <UCard as="div" class="transition cursor-pointer border border-transparent" :class="{ 'border-cyan-500': active }">
    <div class="flex gap-5">
      <NuxtImg placeholder :src="mod.logo" format="webp" class="rounded-xl size-20" />

      <span class="font-semibold text-lg gradient-text">{{ mod.title }}</span>
    </div>

    <div class="flex items-center mt-4 justify-between">
      <UDownloads :downloads="mod.downloads" />
    </div>
  </UCard>
</template>
