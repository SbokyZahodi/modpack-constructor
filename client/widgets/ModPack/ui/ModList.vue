<script lang='ts' setup>
import { RecycleScroller } from 'vue-virtual-scroller'
import ModpackModCard from './ModpackModCard.vue'
import { useModVersions } from '~/features/_modpack/SelectModVersion'

const { modpack, removeMod } = useModpack()
const { showProjectVersions } = useModVersions()

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
      <span class="font-semibold text-lg gradient-text">
        Mods installed - {{ modpack.modlist.length }}
      </span>

      <UPopover :popper="{ placement: 'bottom-end' }">
        <UButton icon="mingcute:filter-3-fill" size="lg" color="gray" />

        <template #panel>
          <div class="p-2 w-90">
            <UTabs :items="modTypesTabs" :default-index="modTypesTabs.findIndex((el) => el.raw === modTypeFilter)" @change="modTypeFilter = modTypesTabs[$event].raw" />
            <UInput v-model="searchByName" placeholder="Filter mods by name" class="mt-2" />
          </div>
        </template>
      </UPopover>
    </div>

    <div class="mt-2 overflow-auto hide-scrollbar relative">
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

      <div v-else class="m-1 flex justify-center items-center mt-15%">
        <UButton trailing-icon="radix-icons:arrow-right" color="gray" size="xl" @click="HSetQuery('tab', 1)">
          Go to browser
        </UButton>
      </div>
    </div>
  </div>
</template>
