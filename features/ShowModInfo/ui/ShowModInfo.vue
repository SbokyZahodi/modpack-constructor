<script lang='ts' setup>
import ModInfoSkeleton from './ModInfoSkeleton.vue'
import { useModpack } from '~/widgets/ModPack'
import type { IModInfo } from '~/shared/api/IModInfo'

const mod = computed(() => HGetQuery('mod', null))
const { modpack, addMod } = useModpack()

const isModExist = computed({
  get() {
    return Boolean(mod.value)
  },
  set(value: boolean) {
    if (!value)
      HSetQuery('mod', null)
  },
})

const { data, pending, execute: fetchModInfo } = await useAPI<IModInfo>(() => `project/${mod.value}`, {
  onRequest({ request, options }) {
    if (request.toString().includes('null'))
      options.signal = new AbortSignal()
  },
})

const latestVersion = computed(() => data.value?.game_versions.at(-1))

const isModCompatible = computed(() => {
  const success = { message: 'Add to modpack', compatible: true }

  if (modpack.value.modlist.includes(data.value?.slug as string))
    return { message: 'Mod is already in modpack', compatible: false }

  if (!data.value?.game_versions.includes(modpack.value.version))
    return { message: 'Mod is not compatible with your version', compatible: false }

  if (data.value?.project_type === 'shader' || data.value?.project_type === 'resourcepack')
    return success

  if (!data.value?.loaders.includes(modpack.value.loader.toLowerCase()))
    return { message: 'Mod is not compatible with your loader', compatible: false }

  return success
})

function addMods() {
  if (data.value)
    addMod(data.value.slug)

  setTimeout(() => {
    HSetQuery('mod', null)
  }, 100)
}

onMounted(() => {
  if (mod.value)
    fetchModInfo()
})
</script>

<template>
  <USlideover v-model="isModExist" :ui="{ base: 'px-5' }">
    <div v-if="!pending && data" class="overflow-auto hide-scrollbar h-90% px-2">
      <UCloseButton class="absolute left-4 mt4" @click="isModExist = false" />
      <UTooltip text="Open in Modrinth" class="absolute right-4 mt4">
        <NuxtLink :to="`https://modrinth.com/mod/${data.slug}`" target="_blank">
          <UButton :icon="ICONS.SHARE" size="xl" variant="soft" />
        </NuxtLink>
      </UTooltip>

      <div class="center">
        <img :src="data?.icon_url" class="rounded-xl size-40 m-5">
      </div>

      <div class="mt-4 text-center font-bold text-3xl">
        {{ data?.title }}
      </div>

      <div class="flex flex-col items-end justify-end">
        <UDownloads v-if="data?.downloads" class="center justify-end mt-5 float-right" :downloads="data.downloads" />

        <div class="mt2">
          latest version {{ latestVersion }}
        </div>

        <div class="mt-2">
          <UBadge v-for="loader in data?.loaders" :key="loader" variant="soft" size="lg" class="m1 font-semibold rounded-full">
            {{ loader }}
          </UBadge>
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

        :ui="{ item: 'snap-end' }" arrows class="mt-4 rounded-xl h-70 overflow-hidden"
      >
        <NuxtImg :src="item" placeholder class="h-70 w-100" draggable="false" />
      </UCarousel>

      <div class="absolute bottom-0 left-0 w-full p-2">
        <UButton class="w-full center font-semibold p-4" :disabled="!isModCompatible.compatible" variant="solid" @click="addMods">
          {{ isModCompatible.message }}
        </UButton>
      </div>
    </div>

    <template v-else>
      <ModInfoSkeleton />
    </template>
  </USlideover>
</template>
