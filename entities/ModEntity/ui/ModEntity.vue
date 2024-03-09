<script lang='ts' setup>
const props = defineProps<{
  mod: IMod
}>()

function showModInfo() {
  setQuery('mod', props.mod.project_id)
}
</script>

<template>
  <UCard as="div" class="transition cursor-pointer hover:bg-light-400 hover:dark:bg-zinc-800 border-inherit shadow-none light:border" @click="showModInfo">
    <div class="flex gap-5">
      <NuxtImg v-if="mod.icon_url" :src="mod.icon_url" format="webp" class="size-20 rounded-xl" />

      <span class="font-semibold text-lg">{{ mod.title }}</span>
    </div>

    <div class="flex items-center justify-between mt-2">
      <UDownloads :downloads="mod.downloads" />
    </div>
  </UCard>
</template>
