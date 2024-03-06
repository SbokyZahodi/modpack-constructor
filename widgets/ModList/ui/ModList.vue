<script lang='ts' setup>
import { ModEntity } from '~/entities/ModEntity'

defineProps<{
  mods: IMod[]
  pending: boolean
}>()
</script>

<template>
  <template v-if="!pending">
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <ModEntity v-for="mod in mods" :key="mod.slug" :mod="mod" />
    </div>
  </template>

  <div v-if="pending" class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
    <USkeleton v-for="n in 9" :key="n" class="h-40 bg-white" />
  </div>
</template>
