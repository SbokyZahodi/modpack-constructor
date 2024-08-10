<script lang='ts' setup>
import type { IModInfoWithFile } from '~/shared/api/types/IModInfo'

defineProps<{
  mod: IModInfoWithFile
}>()

// Actions
defineEmits(['remove', 'selectVersion'])
</script>

<template>
  <UCard>
    <div class="justify-between items-center gap-5">
      <div class="flex gap-5 items-center relative">
        <NuxtImg placeholder :src="mod.logo" format="webp" class="rounded-xl size-15" />
        <p class="font-semibold text-truncate">
          {{ mod.title }}
        </p>
      </div>

      <div class="flex items-center justify-end gap-2 mt-4">
        <UButton class="center h-10 w-40" variant="soft" @click="$emit('selectVersion', mod)">
          <span class="truncate">{{ mod.version.name }}</span>
        </UButton>

        <UButton :icon="ICONS.TRASH" class="center size-10" variant="soft" @click="$emit('remove')" />
      </div>
    </div>
  </UCard>
</template>
