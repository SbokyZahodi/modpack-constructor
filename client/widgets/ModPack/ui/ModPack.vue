<script lang='ts' setup>
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import ModpackInfo from './ModpackInfo.vue'
import ModpackModCard from './ModpackModCard.vue'
import ModpackActions from './ModpackActions.vue'
import { SelectModVersion, useModVersions } from '~/features/_modpack/SelectModVersion'

const ModpackConfigurator = defineAsyncComponent(() => import('./ModpackConfigurator.vue'))

const { modpack, removeMod } = useModpack()

await useAsyncData('modpack', async () => {
  const modpackID = HGetQuery('modpack', null)

  if (!modpackID) {
    const sessionModpack = sessionStorage.getItem('modpack')

    if (!sessionModpack)
      return null

    modpack.value = JSON.parse(sessionModpack)
    return
  }

  return await $fetch<IModPack>('/api/modpack', {
    params: {
      id: modpackID,
    },
    onResponse({ response }) {
      modpack.value = response._data
    },
    onResponseError() {
      showError({ message: 'Modpack not found', statusCode: 404 })
    },
  })
}, { server: false })

const { showProjectVersions } = useModVersions()

const isOptionsModalOpened = ref(false)

const modTypesTabs = [{ label: 'All', raw: 'all' }, { label: 'Mods', raw: 'mod' }, { label: 'Shaders', raw: 'shader' }, { label: 'Resourse packs', raw: 'resourcepack' }]
const modTypeFilter = ref(modTypesTabs[0]?.raw)
const searchByName = ref('')

const modsByTab = computed(() => {
  if (modTypeFilter.value === 'all')
    return modpack.value.modlist

  return modpack.value.modlist.filter(mod => mod.project_type === modTypeFilter.value)
})
const modsBySearch = computed(() => modsByTab.value?.filter(mod => mod.title.toLowerCase().includes(searchByName.value.toLowerCase())))
</script>

<template>
  <div>
    <div class="flex justify-between items-center mx-1">
      <div class="flex gap-2">
        <div class="flex gap-2">
          <ModpackInfo v-model:isOptionsModalOpened="isOptionsModalOpened" :modpack="modpack" />
        </div>

        <UPopover :popper="{ placement: 'bottom' }">
          <UButton icon="mingcute:filter-3-fill" size="lg" color="gray" />

          <template #panel>
            <div class="p-2 w-90">
              <UTabs :items="modTypesTabs" :default-index="modTypesTabs.findIndex((el) => el.raw === modTypeFilter)" @change="modTypeFilter = modTypesTabs[$event].raw" />
              <UInput v-model="searchByName" placeholder="Filter mods by name" class="mt-2" />
            </div>
          </template>
        </UPopover>
      </div>

      <ModpackActions v-if="modpack.modlist.length" :modpack="modpack" class="flex gap-2" />
    </div>

    <div class="overflow-auto mt-2 hide-scrollbar relative">
      <RecycleScroller
        v-if="modpack.modlist.length"
        v-slot="{ item: mod }"
        class="hide-scrollbar h-80vh md:h-85vh"
        :items="modsBySearch"
        :item-size="180"
        key-field="slug"
      >
        <div>
          <ModpackModCard class="m-1" :mod="mod" @remove="removeMod(mod.slug)" @select-version="(mod) => showProjectVersions(mod)" />
        </div>
      </RecycleScroller>

      <div v-else class="mt-70">
        <UNotFound />
      </div>
    </div>

    <ModpackConfigurator v-model="isOptionsModalOpened" @close-modal="isOptionsModalOpened = false" />
    <SelectModVersion />
  </div>
</template>
