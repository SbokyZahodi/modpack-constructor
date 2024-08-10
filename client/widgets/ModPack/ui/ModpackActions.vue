<script setup lang="ts">
import { DownloadModpack } from '~/features/_modpack/DownloadModpack'
import { ShareModpack } from '~/features/_modpack/ShareModpack'

defineProps<{
  modpack: globalThis.IModPack
}>()
</script>

<template>
  <div>
    <DownloadModpack class="center" size="md" :modpack="modpack" />
    <ShareModpack class="center" size="md" />
  </div>
</template>
