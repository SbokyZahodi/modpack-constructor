<script lang='ts' setup>
import { useModVersions } from '../model'
import fetchModVersions from '~/modcurse/queries/fetchModVersions'
import type { IVersion } from '~/shared/api/types/IVersion'

const { project } = useModVersions()
const { modpack, setModVersion } = useModpack()
const isProjectExist = computed(() => project.value !== null)

function closeVersionSelector() {
  project.value = null
}

const { data, pending } = await useAsyncData(async () => {
  if (!project.value)
    return

  const { provider } = project.value

  if (provider === 'curseforge') {
    return fetchModVersions({ mod: project.value, version: modpack.value.version, loader: modpack.value.loader }).CurseForge()
  }

  else {
    return fetchModVersions({ mod: project.value, version: modpack.value.version, loader: modpack.value.loader }).Modrinth()
  }
}, { watch: [project] })

const currentVersion = computed(() => {
  return modpack.value.modlist.find(mod => mod.slug === project.value?.slug)?.version
})

function selectVersion(version: IVersion) {
  setModVersion(version)
  closeVersionSelector()
}
</script>

<template>
  <UModal v-model="isProjectExist" @close="closeVersionSelector">
    <div class="p-4">
      <div class="flex justify-between items-center b-b pb-2">
        Select mod version
        <UCloseButton @click="closeVersionSelector" />
      </div>

      <div class="mt-2 p-2 overflow-auto h-100">
        <template v-if="pending">
          <USkeleton v-for="n in 8" :key="n" class="mt-2 w-full h-10" />
        </template>

        <div v-else>
          <template v-for="version in data" :key="version.version_number">
            <UButton class="w-full h-10 mt-2 flex justify-between" :variant="version.id === currentVersion?.id ? 'solid' : 'ghost'" @click="selectVersion(version)">
              <div class="truncate">
                {{ version.name }}
              </div>
            </UButton>
          </template>
        </div>
      </div>
    </div>
  </UModal>
</template>
