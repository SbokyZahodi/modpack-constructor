<script setup lang="ts">
import { DownloadModpack } from '~/features/_modpack/DownloadModpack'
import { ShareModpack } from '~/features/_modpack/ShareModpack'

defineProps<{
  modpack: globalThis.IModPack
}>()
</script>

<template>
  <div>
    <UTooltip text="Download modpack">
      <DownloadModpack size="lg" color="gray" :modpack="modpack" />
    </UTooltip>
    <UTooltip text="Share modpack">
      <ShareModpack size="lg" color="gray" />
    </UTooltip>
    <!-- <UTooltip text="Save modpack">
      <UButton icon="material-symbols:save" size="lg" color="gray" />
    </UTooltip> -->
  </div>
</template>
