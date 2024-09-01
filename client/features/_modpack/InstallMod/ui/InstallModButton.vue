<script lang='ts' setup>
import type { IModInfo } from '~/shared/api/types/IModInfo'
import { fetchModWithDependencies } from '~/modcurse'

const props = defineProps<{
  mod: IModInfo
}>()

const emit = defineEmits(['installed'])

const { modpack, addMod } = useModpack()
const pending = ref(false)

async function fetchModsWithDeps() {
  if (!props.mod)
    throw new Error('No mod provided')

  pending.value = true

  try {
    const filterParams = {
      modloader: modpack.value.loader,
      version: modpack.value.version,
    }

    if (props.mod.provider === 'curseforge') {
      const mods = await fetchModWithDependencies(props.mod, modpack.value.version, modpack.value.loader).CurseForge(filterParams)

      mods.forEach(mod => addMod(mod))
    }

    else if (props.mod.provider === 'modrinth') {
      const mods = await fetchModWithDependencies(props.mod, modpack.value.version, modpack.value.loader).Modrinth(filterParams)

      mods.forEach(mod => addMod(mod))
    }
  }
  catch {
    useToast().add({ title: 'Failed to install mod', color: 'red' })
  }

  finally {
    pending.value = false
  }

  pending.value = false

  emit('installed')
}

const isModCompatible = computed(() => {
  const success = { message: 'Add to modpack', compatible: true }

  if (modpack.value.modlist.some(({ slug }) => slug === props.mod.slug))
    return { message: 'Mod is already in modpack', compatible: false }

  return success
})
</script>

<template>
  <UButton class="font-semibold w-full p-4 center" :loading="pending" :disabled="!isModCompatible.compatible" variant="solid" @click="fetchModsWithDeps">
    {{ isModCompatible.message }}
  </UButton>
</template>
