<script lang='ts' setup>
import { useModVersions } from '../model'
import { useModpack } from '~/widgets/ModPack'

const { project } = useModVersions()
const { modpack, setModVersion } = useModpack()
const isProjectExist = computed(() => project.value !== null)

function close() {
  project.value = null
}

const { data, pending } = await useAsyncData<IVersion[] | void>(async () => {
  if (!project.value)
    return

  const params = {
    game_versions: JSON.stringify([modpack.value.version]),
    loaders: JSON.stringify([modpack.value.loader]).toLowerCase(),
  }

  const versions = await $api<IVersion[]>(`project/${project.value.slug}/version`, {
    params: project.value.project_type === 'mod' ? params : { game_versions: JSON.stringify([modpack.value.version]) },
  })

  return versions
}, {
  watch: [project],
})

const currentVersion = computed(() => {
  return modpack.value.modlist.find(mod => mod.slug === project.value?.slug)?.version
})

function selectVersion(version: IVersion) {
  setModVersion(project.value!.slug, version.id, version.name)
  close()
}
</script>

<template>
  <UModal v-model="isProjectExist" @close="close">
    <div class="p-4">
      <div class="flex justify-between items-center b-b pb-2 b-dark">
        Select mod version
        <UCloseButton @click="close" />
      </div>

      <div class="overflow-auto mt-2 p-2 h-100">
        <template v-if="pending">
          <USkeleton v-for="n in 8" :key="n" class="mt-2 w-full h-10" />
        </template>

        <div v-else>
          <template v-for="version in data" :key="version.version_number">
            <UButton class="w-full h-10 mt-2 flex justify-between" :variant="version.id === currentVersion ? 'solid' : 'ghost'" @click="selectVersion(version)">
              <div class="truncate">
                {{ version.version_number }} - {{ version.version_type }}
              </div>

              <div class="truncate max-w-70">
                {{ version.game_versions.join(', ') }}
              </div>
            </UButton>
          </template>
        </div>
      </div>
    </div>
  </UModal>
</template>
