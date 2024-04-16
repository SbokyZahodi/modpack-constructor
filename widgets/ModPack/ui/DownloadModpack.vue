<script lang='ts' setup>
import useDownloadModpack from '../api/useDownloadModpack'

const { state, downloadModpack } = useDownloadModpack()
</script>

<template>
  <UButton v-bind="$attrs" icon="material-symbols:download" variant="ghost" @click="downloadModpack">
    Download
  </UButton>

  <UModal v-model="state.isFetching" prevent-close :ui="{ background: 'bg-transparent shadow-none dark:bg-transparent' }">
    <UIcon class="mx-auto text-5xl text-sky mb-4" name="material-symbols:download-rounded" />
    <UProgress indicator :value="state.progress" :max="state.modsCount" />
    <p class="text-end mt-2 flex items-center gap-2 justify-end">
      {{ state.stage }} <UIcon name="mingcute:loading-3-line" class="animate-spin text-xl" />
    </p>
  </UModal>
</template>
