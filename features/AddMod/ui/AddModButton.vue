<script lang='ts' setup>
import { fetchModWithDependencies } from '../api'
import { useModpack } from '~/widgets/ModPack'

const props = defineProps<{
  mod: IModInfo
}>()

const { modpack, addMod } = useModpack()
const pending = ref(false)

async function fetchModsWithDeps() {
  if (!props.mod)
    throw new Error('No mod provided')

  pending.value = true

  const modsToAppend = await fetchModWithDependencies(props.mod, modpack.value)

  modsToAppend?.forEach(mod => addMod(mod))

  pending.value = false

  setTimeout(() => {
    HSetQuery('mod', null)
  }, 100)
}

const isModCompatible = computed(() => {
  const success = { message: 'Add to modpack', compatible: true }

  if (modpack.value.modlist.some(({ slug }) => slug === props.mod.slug))
    return { message: 'Mod is already in modpack', compatible: false }

  if (!props.mod.game_versions.includes(modpack.value.version))
    return { message: 'Mod is not compatible with your version', compatible: false }

  if (props.mod.project_type === 'shader' || props.mod.project_type === 'resourcepack')
    return success

  if (!props.mod.loaders.includes(modpack.value.loader.toLowerCase()))
    return { message: 'Mod is not compatible with your loader', compatible: false }

  return success
})
</script>

<template>
  <UButton class="center font-semibold w-full p-4" :loading="pending" :disabled="!isModCompatible.compatible" variant="solid" @click="fetchModsWithDeps">
    {{ isModCompatible.message }}
  </UButton>
</template>
