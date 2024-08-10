<script lang='ts' setup>
import type { IModInfo } from '~/shared/api/types/IModInfo'

defineProps<{
  mod: IModInfo
}>()

// Actions
defineEmits(['remove', 'select-version'])
</script>

<template>
  <UCard>
    <NuxtImg placeholder :src="mod.logo" format="webp" class="rounded-xl size-20" />
  </UCard>
</template>
