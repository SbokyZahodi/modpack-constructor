<script lang='ts' setup>
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { RecycleScroller } from 'vue-virtual-scroller'
import { useModpack } from '..'
import ModPackConfigurator from './ModPackConfigurator.vue'
import DownloadModpack from './DownloadModpack.vue'
import { CopyModList } from '~/features/CopyModList'
import { ModCard } from '~/entities/ModEntity'
import { ShowModVersions, useModVersions } from '~/features/ShowModVersions'

const { modpack, removeMod, removeAllMods } = useModpack()
const { showProjectVersions } = useModVersions()

const { data: mods, pending } = await useAPI<IMod[]>(() => `projects?ids=${JSON.stringify(modpack.value.modlist.map(mod => mod.slug))}`, {
  immediate: true,
  key: 'modlist',
  onResponse() {
    HSetQuery('modpack', JSON.stringify(modpack.value))
  },
})

const isSlideOpen = ref(false)
const isOptionsModalOpened = ref(false)

const modTypesTabs = [{ label: 'Mods', raw: 'mod' }, { label: 'Shaders', raw: 'shader' }, { label: 'Resourse packs', raw: 'resourcepack' }]
const modTypeFilter = ref(modTypesTabs[0].raw)
const searchByName = ref('')

defineShortcuts({
  alt_a: {
    handler: () => {
      isSlideOpen.value = true
    },
  },
})

const modsByTab = computed(() => mods.value?.filter(mod => mod.project_type === modTypeFilter.value))
const modsBySearch = computed(() => modsByTab.value?.filter(mod => mod.title.toLowerCase().includes(searchByName.value.toLowerCase())))
</script>

<template>
  <USlideover v-model="isSlideOpen" side="left" :ui="{ width: 'max-w-3xl' }">
    <div class="h-full p-2">
      <div class="w-full justify-between items-center gap-4 flex">
        <UTabs class="w-full pt-2" :items="modTypesTabs" :default-index="modTypesTabs.findIndex((el) => el.raw === modTypeFilter)" @change="modTypeFilter = modTypesTabs[$event].raw" />

        <UCloseButton @click="isSlideOpen = false" />
      </div>

      <div class="flex justify-between gap-2 p-1">
        <div class="flex w-full gap-2">
          <UTooltip text="Remove all mods">
            <UButton :icon="ICONS.TRASH" color="red" variant="outline" :loading="pending" @click="removeAllMods">
              <span class="hidden md:block">Clear All</span>
            </UButton>
          </UTooltip>
          <CheckForUpdates />
        </div>
        <CopyModList :modlist="modpack.modlist" color="gray" />
      </div>
      <UInput v-model="searchByName" placeholder="Filter mods by name" class="my-2" />

      <div class="overflow-auto relative hide-scrollbar">
        <TransitionScale axis="x" appear>
          <RecycleScroller
            v-if="modsBySearch"
            v-slot="{ item }"
            class="h-65vh md:h-170 hide-scrollbar"
            :items="modsBySearch"
            :item-size="170"
            key-field="slug"
          >
            <ul class="relative m-2" :mod="item">
              <ModCard :mod="item" />

              <div class="absolute right-4 flex gap-2 bottom-4 md:bottom-auto md:top-4">
                <UTooltip text="Select mod version">
                  <UButton variant="outline" :icon="ICONS.CUBE" @click="showProjectVersions(item)">
                    <span class="truncate w-30">{{ modpack.modlist.find(m => m.slug === item.slug)?.version_name }}</span>
                  </UButton>
                </UTooltip>
                <UTooltip text="Remove mod">
                  <UButton color="red" variant="outline" :loading="pending" :icon="ICONS.TRASH" @click="removeMod(item.slug)" />
                </UTooltip>
              </div>
            </ul>
          </RecycleScroller>
        </TransitionScale>

        <UNotFound v-if="!modsBySearch?.length" class="absolute top-0 left-0 w-full md:h-[90%] h-1/2 m-1" />
      </div>

      <div class="absolute w-full px-2 left-0 bottom-0 pb-3">
        <UCard :ui="{ body: { padding: 'p-2' } }">
          <div class="flex overflow-auto hide-scrollbar justify-between items-center">
            <div class="flex items-center gap-4">
              <UTooltip text="Select modpack configuration" @click="isOptionsModalOpened = true">
                <UButton :icon="ICONS.GEAR" color="gray" size="lg" />
              </UTooltip>

              <UButton class="center" variant="ghost">
                {{ modpack.loader }}
              </UButton>
              <UButton class="center" variant="ghost">
                {{ modpack.version }}
              </UButton>
            </div>

            <div class="flex gap-4 mt-2 md:mt-0">
              <DownloadModpack :disabled="pending" />
              <UButton :icon="ICONS.SHARE" variant="ghost" @click="HCopyToClipboard()">
                Share
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </div>
    <ModPackConfigurator v-model="isOptionsModalOpened" @close-modal="isOptionsModalOpened = false" />
    <ShowModVersions />
  </USlideover>

  <UTooltip :popper="{ placement: 'bottom' }" text="Open modpack" :shortcuts="['Alt', 'A']" class="text-xl absolute left-4 top-4">
    <UCard :ui="{ body: { padding: 'p-1' } }" class="cursor-pointer overflow-hidden rounded-full w-13 hover:bg-cyan transition-all duration-500" :class="{ 'w-70': mods?.length }" @click="isSlideOpen = true">
      <div class="flex items-center gap-4">
        <UButton size="xl" class="rounded-full" icon="streamline:backpack-solid" />

        <UAvatarGroup :max="5" size="md">
          <UAvatar v-for="mod in mods" :key="mod.project_id" :src="mod.icon_url" class="bg-zinc" />
        </UAvatarGroup>
      </div>
    </UCard>
  </UTooltip>
</template>
