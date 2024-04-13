<script lang='ts' setup>
import { useModpack } from '..'
import ModPackConfigurator from './ModPackConfigurator.vue'
import { ModEntity } from '~/entities/ModEntity'

const isSlideOpen = ref(false)
const isOptionsModalOpened = ref(false)

const tabsItems = [{ label: 'Mods', raw: 'mod' }, { label: 'Shaders', raw: 'shader' }, { label: 'Resourse packs', raw: 'resourcepack' }]
const currentFilter = ref(tabsItems[0].raw)

defineShortcuts({
  alt_a: {
    handler: () => {
      isSlideOpen.value = true
    },
  },
})

const { modpack, removeMod } = useModpack()

watch(modpack.value, () => {
  HSetQuery('modpack', JSON.stringify(modpack.value))
}, { immediate: false })

const { data: mods, pending } = await useAPI<IMod[]>(() => `projects?ids=${JSON.stringify(modpack.value.modlist)}`, {
  immediate: true,
})

const modsByTab = computed(() => mods.value?.filter(mod => mod.project_type === currentFilter.value))
</script>

<template>
  <USlideover v-model="isSlideOpen" side="left" prevent-close @click="isSlideOpen = false">
    <div class="h-full p-2 relative w-200 bg-white dark:bg-dark-600">
      <div class="gap-2 w-full items-end">
        <UTabs :items="tabsItems" :default-index="tabsItems.findIndex((el) => el.raw === currentFilter)" @change="currentFilter = tabsItems[$event].raw" />
      </div>

      <div class="mt-5 overflow-auto hide-scrollbar h-80%">
        <div v-if="modsByTab?.length">
          <TransitionExpand group>
            <div v-for="mod in modsByTab" :key="mod.slug" class="relative my-2" :mod="mod">
              <ModEntity class="" :mod="mod" />

              <UTooltip text="Remove mod" class="absolute right-4 top-4">
                <UButton color="red" variant="outline" :loading="pending" icon="octicon:trash-16" class="" @click="removeMod(mod.slug)" />
              </UTooltip>
            </div>
          </TransitionExpand>
        </div>

        <UNotFound v-else class="h-full">
          Seems... <br> here is empty <br> Maybe add mods?
        </UNotFound>
      </div>

      <div class="absolute p-2 w-full left-0 bottom-0">
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

              <div>
                <UCheckbox v-model="modpack.dependenciesAutoinstall" label="Install dependencies" size="xl" :ui="{ form: 'size-5' }" />
              </div>
            </div>

            <div class="flex gap-4">
              <UButton icon="material-symbols:download" variant="ghost">
                Download
              </UButton>
              <UButton icon="ph:share-fat" variant="ghost" @click="HCopyToClipboard()">
                Share
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </USlideover>

  <ModPackConfigurator v-model="isOptionsModalOpened" @close-modal="isOptionsModalOpened = false" />

  <UTooltip :popper="{ placement: 'right' }" text="Open modpack" :shortcuts="['Alt', 'A']" class="text-xl fixed left-5 top-5">
    <UButton size="xl" icon="streamline:backpack-solid" color="sky" @click="isSlideOpen = true" />
  </UTooltip>
</template>
