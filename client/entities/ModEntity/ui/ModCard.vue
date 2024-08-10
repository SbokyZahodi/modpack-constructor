<script lang='ts' setup>
import type { IModInfo } from '~/shared/api/types/IModInfo'

defineProps<{
  mod: IModInfo
}>()
</script>

<template>
  <UCard as="div" class="transition cursor-pointer hover:bg-light-400 hover:dark:bg-zinc-800 border-inherit shadow-none light:border">
    <div class="flex gap-5">
      <NuxtImg placeholder :src="mod.logo" format="webp" class="rounded-xl size-20" />

      <span class="font-semibold text-lg w-2/3">{{ mod.title }}</span>
    </div>

    <div class="flex items-center mt-4 justify-between">
      <UDownloads :downloads="mod.downloads" />
    </div>
  </UCard>
</template>
