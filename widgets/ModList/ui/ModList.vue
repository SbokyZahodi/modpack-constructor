<script lang='ts' setup>
import { ModCard } from '~/entities/ModEntity'

defineProps<{
  mods: IMod[]
  pending: boolean
}>()
</script>

<template>
  <div>
    <template v-if="!pending">
      <ul class="gap-5 gridy-300">
        <li v-for="mod in mods" :key="mod.slug" @click="HSetQuery('mod', mod.project_id)">
          <ModCard :mod="mod" />
        </li>
      </ul>
    </template>

    <div v-if="pending" class="gridy-300 gap-5 mt-5">
      <USkeleton v-for="n in 12" :key="n" class="h-40" />
    </div>

    <UCard v-if="!mods?.length && !pending" class="h-140 center">
      <UNotFound class="">
        Not found
      </UNotFound>
    </UCard>
  </div>
</template>
