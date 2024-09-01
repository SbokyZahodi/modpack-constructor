<script lang='ts' setup>
import type { IProvider } from '~/shared/api/types/IProvider'

const props = defineProps<{
  modSlug: string
  provider: IProvider
}>()

const currentSource = computed(() => {
  if (props.provider === 'modrinth') {
    return {
      link: `https://modrinth.com/mod/${props.modSlug}`,
      name: 'Modrinth',
    }
  }

  else {
    return {
      link: `https://www.curseforge.com/minecraft/mc-mods/${props.modSlug}`,
      name: 'CurseForge',
    }
  }
})
</script>

<template>
  <UTooltip :popper="{ placement: 'bottom-end' }" :text="`Open in ${currentSource.name}`" class="absolute mt4 right-4">
    <NuxtLink :to="currentSource.link" target="_blank">
      <UButton :icon="ICONS.SHARE" size="xl" variant="soft" />
    </NuxtLink>
  </UTooltip>
</template>
