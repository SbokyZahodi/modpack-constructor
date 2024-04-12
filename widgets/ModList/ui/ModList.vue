<script lang='ts' setup>
import { ModEntity } from '~/entities/ModEntity'

defineProps<{
  mods: IMod[]
  pending: boolean
}>()
</script>

<template>
  <template v-if="!pending">
    <div class="gap-5 gridy-300">
      <ModEntity v-for="mod in mods" :key="mod.slug" :mod="mod" @click="HSetQuery('mod', mod.project_id)" />
    </div>
  </template>

  <div v-if="pending" class="gridy-300 gap-5 mt-5">
    <USkeleton v-for="n in 12" :key="n" class="h-40" />
  </div>
</template>
