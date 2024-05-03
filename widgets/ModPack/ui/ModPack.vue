<script lang='ts' setup>
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { useModpack } from '..'
import ModPackConfigurator from './ModPackConfigurator.vue'
import DownloadModpack from './DownloadModpack.vue'
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
              Clear All
            </UButton>
          </UTooltip>
        </div>
        <UButton color="gray">
          Mods installed: {{ modpack.modlist.length }}
        </UButton>
      </div>
      <UInput v-model="searchByName" placeholder="Filter mods by name" class="mt-2" />

      <div class="overflow-auto hide-scrollbar h-75%">
        <div class="p1">
          <TransitionExpand group tag="ul">
            <ul v-for="mod in modsBySearch" :key="mod.project_id" class="relative my-2" :mod="mod">
              <ModCard :mod="mod" />

              <div class="absolute right-4 flex gap-2 bottom-4 md:bottom-auto md:top-4">
                <UTooltip text="Select mod version">
                  <UButton variant="outline" :icon="ICONS.CUBE" @click="showProjectVersions(mod)">
                    <span class="truncate w-30">{{ modpack.modlist.find(m => m.slug === mod.slug)?.version_name }}</span>
                  </UButton>
                </UTooltip>
                <UTooltip text="Remove mod">
                  <UButton color="red" variant="outline" :loading="pending" :icon="ICONS.TRASH" @click="removeMod(mod.slug)" />
                </UTooltip>
              </div>
            </ul>
          </TransitionExpand>
        </div>

        <TransitionExpand>
          <UNotFound v-if="!modsBySearch?.length" class="md:h-[90%] h-1/2 m-1" />
        </TransitionExpand>
      </div>

      <div class="absolute p-2 w-full left-0 bottom-0">
        <UCard>
          <div class="md:flex justify-between items-center">
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
