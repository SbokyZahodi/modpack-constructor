<script lang='ts' setup>
defineProps<{
  modpack: IModPack
}>()

const { state, downloadModpack } = useDownloadModpack()
</script>

<template>
  <UButton v-bind="$attrs" :icon="ICONS.DOWNLOAD" @click="downloadModpack(modpack)">
    Download
  </UButton>

  <UModal v-model="state.isFetching" prevent-close :ui="{ background: 'bg-transparent shadow-none dark:bg-transparent' }">
    <UIcon class="mx-auto text-5xl text-sky mb-4" name="material-symbols:download-rounded" />
    <UProgress animation="carousel" />
    <div class="flex justify-between items-center">
      <p class="flex items-center gap-2 mt-2 justify-end text-end">
        Downloading mods... <UIcon name="mingcute:loading-3-line" class="text-xl animate-spin" />
      </p>

      <span class="w-30 text-right">{{ toMegabytes(state.loaded) }} / {{ toMegabytes(state.total) }}</span>
    </div>
  </UModal>
</template>
