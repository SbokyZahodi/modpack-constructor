<script lang='ts' setup>
import { useDownloadModpack } from '../api'

const { state, downloadModpack } = useDownloadModpack()
</script>

<template>
  <UButton icon="material-symbols:download" variant="ghost" @click="downloadModpack">
    Download
  </UButton>

  <UModal v-model="state.isFetching" prevent-close>
    asd
  </UModal>
</template>
