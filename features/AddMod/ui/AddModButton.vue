<script lang='ts' setup>
import { useModpack } from '~/widgets/ModPack'

const props = defineProps<{
  mod: IModInfo
}>()

const { modpack, addMod } = useModpack()
const pending = ref(false)

async function fetchModWithDependencies() {
  pending.value = true

  const params = () => {
    if (props.mod.project_type === 'mod') {
      return {
        game_versions: JSON.stringify([modpack.value.version]),
        loaders: JSON.stringify([modpack.value.loader]).toLowerCase(),
      }
    }

    else {
      return {
        game_versions: JSON.stringify([modpack.value.version]),
        featured: true,
      }
    }
  }

  const versions = await $api<IVersion[]>(`project/${props.mod.slug}/version`, {
    params: params(),
  })

  if (!versions.length) {
    useToast().add({ title: 'This mod is incompatible with your version', color: 'red' })
    pending.value = false
    return
  }

  const dependencies = versions[0].dependencies.filter(({ dependency_type }) => dependency_type === 'required')

  const dependenciesPromises = dependencies.map(({ project_id }) => $api<IModInfo>(`project/${project_id}`))

  const dependenciesList = await Promise.all(dependenciesPromises)

  const dependenciesVersions = await Promise.all(dependenciesList.map(({ slug }) => $api<IVersion[]>(`project/${slug}/version`, {
    params: params(),
  })))

  const modsToAppend = [
    { slug: props.mod.slug, version: versions[0].id, project_type: props.mod.project_type, version_name: versions[0].name },
    ...dependenciesList.map((mod, index) => ({ slug: mod.slug, version: dependenciesVersions[index][0].id, project_type: mod.project_type, version_name: dependenciesVersions[index][0].name })),
  ]

  modsToAppend.forEach(mod => addMod(mod))

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
  <UButton class="center w-full p-4 font-semibold" :loading="pending" :disabled="!isModCompatible.compatible" variant="solid" @click="fetchModWithDependencies">
    {{ isModCompatible.message }}
  </UButton>
</template>
