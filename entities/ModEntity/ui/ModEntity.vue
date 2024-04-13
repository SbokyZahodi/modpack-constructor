<script lang='ts' setup>
defineProps<{
  mod: IMod
}>()
</script>

<template>
  <UCard as="div" class="transition cursor-pointer hover:bg-light-400 hover:dark:bg-zinc-800 border-inherit shadow-none light:border">
    <div class="flex gap-5">
      <NuxtImg v-if="mod.icon_url" :src="mod.icon_url" format="webp" class="rounded-xl size-20" />

      <span class="font-semibold text-lg w-2/3">{{ mod.title }}</span>
    </div>

    <div class="flex items-center justify-between mt-2">
      <UDownloads :downloads="mod.downloads" />
    </div>
  </UCard>
</template>
