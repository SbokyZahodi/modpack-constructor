<script lang='ts' setup>
import ModInfoSkeleton from './ModInfoSkeleton.vue'
import { useModpack } from '~/widgets/ModPack'
import type { IModInfo } from '~/shared/types/IModInfo'

const { addMod } = useModpack()

const mod = computed(() => getQuery('mod', null))
const { modpack } = useModpack()

const isModExist = computed(() => Boolean(mod.value))

const { data, pending, execute: fetchMod } = await useLazyAPI<IModInfo>(() => `project/${mod.value}`)

const latestVersion = computed(() => data.value?.game_versions.at(-1))

const isModCompatible = computed(() => {
  const success = { message: 'Add to modpack', compatible: true }

  if (data.value?.project_type !== 'mod')
    return success

  if (!data.value?.loaders.includes(modpack.value.loader.toLowerCase()))
    return { message: 'Mod is not compatible with your loader', compatible: false }

  if (!data.value?.game_versions.includes(modpack.value.version))
    return { message: 'Mod is not compatible with your version', compatible: false }

  if (modpack.value.modlist.includes(data.value?.slug))
    return { message: 'Mod is already in modpack', compatible: false }

  return success
})

function addMods() {
  if (data.value)
    addMod(data.value.slug)
  setQuery('mod', null)
}

onMounted(() => {
  if (mod.value)
    fetchMod()
})

function clear() {
  setQuery('mod', null)
}
</script>

<template>
  <USlideover v-model="isModExist" :ui="{ base: 'px-5' }" @close="clear">
    <div v-if="!pending" class="overflow-auto hide-scrollbar h-90% px-2">
      <div class="center">
        <img :src="data?.icon_url" class="rounded-xl size-40 m-5">
      </div>

      <div class="text-center font-bold text-3xl mt-4">
        {{ data?.title }}
      </div>

      <div class="flex flex-col items-end justify-end">
        <UDownloads v-if="data?.downloads" class="center justify-end mt-5 float-right" :downloads="data.downloads" />

        <div class="">
          latest version {{ latestVersion }}
        </div>

        <div>
          <UPopover mode="hover" :popper="{ placement: 'bottom-end' }">
            <UButton variant="outline" class="w-40 center mt-2">
              loaders
            </UButton>

            <template #panel>
              <div v-for="loader in data?.loaders" :key="loader" class="w-40 center m-2 capitalize">
                {{ loader }}
              </div>
            </template>
          </UPopover>
        </div>
      </div>

      <UCard class="mt-5 text-sm">
        {{ data?.description }}
      </UCard>

      <UCarousel
        v-if="data?.gallery.length"
        v-slot="{ item }" :items="data?.gallery.map((item) => item.url).slice(0, 10)"
        indicators
        :prev-button="{
          color: 'gray',
          icon: 'mingcute:left-fill',
          class: '',
        }"
        :next-button="{
          color: 'gray',
          icon: 'mingcute:right-fill',
          class: '',
        }"

        :ui="{ item: 'snap-end' }" arrows class="mt-4 h-70 w-100 rounded-xl overflow-hidden"
      >
        <NuxtImg :src="item" placeholder class="w-100 h-70" draggable="false" />
      </UCarousel>

      <div class="absolute bottom-0 left-0 w-full p-2">
        <UButton class="w-full center p-4 font-semibold" :disabled="!isModCompatible.compatible" variant="solid" @click="addMods">
          {{ isModCompatible.message }}
        </UButton>
      </div>
    </div>

    <template v-else>
      <ModInfoSkeleton />
    </template>
  </USlideover>
</template>
