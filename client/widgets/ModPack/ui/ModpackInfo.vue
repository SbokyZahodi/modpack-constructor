<script setup lang="ts">
defineProps<{
  modpack: IModPack
}>()
const isOptionsModalOpened = defineModel<boolean>('isOptionsModalOpened', { required: true })
</script>

<template>
  <div class="flex overflow-auto hide-scrollbar justify-between items-center">
    <div class="flex items-center gap-4">
      <UTooltip text="Select modpack configuration" :popper="{ placement: 'bottom-start' }" @click="isOptionsModalOpened = true">
        <UButton :icon="ICONS.GEAR" color="gray" size="lg">
          {{ modpack.loader }} - {{ modpack.version }}
        </UButton>
      </UTooltip>
    </div>
  </div>
</template>
