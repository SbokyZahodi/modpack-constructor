<script lang='ts' setup>
import { useModpack } from '..'
import ModPackOptions from './ModPackOptions.vue'
import { ModEntity } from '~/entities/ModEntity'

const isSlideOpen = ref(false)
const isOptionsModalOpened = ref(false)

const tabsItems = [{ label: 'Mods', raw: 'mod' }, { label: 'Shaders', raw: 'shader' }, { label: 'Resourse packs', raw: 'resourcepack' }]
const currentFilter = ref(tabsItems[0].raw)

const { modpack, removeMod } = useModpack()

watch(modpack.value, () => {
  setQuery('modpack', JSON.stringify(modpack.value))
}, { immediate: false })

const { data: mods } = await useAPI<IMod[]>(() => `projects?ids=${JSON.stringify(modpack.value.modlist)}`, {
  immediate: true,
})

const modsByTab = computed(() => mods.value?.filter(mod => mod.project_type === currentFilter.value))
</script>

<template>
  <div class="left-0 top-0 h-full w-20 bg-gray opacity-5 fixed" @click="isSlideOpen = true">
    <USlideover v-model="isSlideOpen" side="left" prevent-close @click="isSlideOpen = false">
      <div class="h-full p-2 relative w-200 bg-white dark:bg-dark-600">
        <div class="gap-2 w-full items-end">
          <UTabs :items="tabsItems" :default-index="tabsItems.findIndex((el) => el.raw === currentFilter)" @change="currentFilter = tabsItems[$event].raw" />
        </div>

        <div class="mt-5 overflow-auto hide-scrollbar h-80%">
          <div v-if="mods">
            <TransitionExpand group class="grid grid-cols-2 gap-2">
              <div v-for="mod in modsByTab" :key="mod.slug" class="relative" :mod="mod">
                <ModEntity class="" :mod="mod" />

                <UButton color="red" variant="outline" icon="octicon:trash-16" class="absolute right-4 top-4" @click="removeMod(mod.slug)" />
              </div>
            </TransitionExpand>
          </div>
        </div>

        <div class="absolute left-0 p-2 w-full bottom-0">
          <UCard>
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-4">
                <UTooltip text="Select modpack configuration" @click="isOptionsModalOpened = true">
                  <UButton icon="material-symbols:settings-rounded" color="gray" size="lg" />
                </UTooltip>

                <UButton class="center" variant="ghost">
                  {{ modpack.loader }}
                </UButton>
                <UButton class="center" variant="ghost">
                  {{ modpack.version }}
                </UButton>
              </div>

              <div class="flex gap-4">
                <UButton icon="material-symbols:download" variant="ghost">
                  Download
                </UButton>
                <UButton icon="ph:share-fat" variant="ghost" @click="copyURLToClipboard()">
                  Share
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </USlideover>

    <ModPackOptions v-model="isOptionsModalOpened" @close="isOptionsModalOpened = false" />
  </div>
</template>
