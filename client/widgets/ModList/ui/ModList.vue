<script lang='ts' setup>
import { ModCard } from '~/entities/ModEntity'
import type { IModInfo } from '~/shared/api/types/IModInfo'

defineProps<{
  mods: IModInfo[]
  pending: boolean
}>()

const { modpack } = useModpack()
</script>

<template>
  <div>
    <template v-if="!pending">
      <ul class="gap-4 grid lg:grid-cols-2">
        <li v-for="mod in mods" :key="mod.slug">
          <ModCard :mod="mod" :active="modpack.modlist.some(m => m.slug === mod.slug)" @click="useState('mod').value = mod" />
        </li>
      </ul>
    </template>

    <div v-if="pending" class="grid lg:grid-cols-2 gap-4">
      <USkeleton v-for="n in 12" :key="n" class="h-40" />
    </div>

    <UCard v-if="!mods?.length && !pending" class="center h-140">
      <UNotFound>
        Not found
      </UNotFound>
    </UCard>
  </div>
</template>
