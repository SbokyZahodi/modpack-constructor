<script lang='ts' setup>
import ModInfoSkeleton from './ModInfoSkeleton.vue'
import { useModpack } from '~/widgets/ModPack'
import type { IModInfo } from '~/shared/types/IModInfo'

const { addMod } = useModpack()

const mod = computed(() => useRoute().query.mod?.toString() || null)

const isModExist = computed(() => Boolean(mod.value))

const { data, pending, execute: fetchMod } = await useLazyAPI<IModInfo>(() => `project/${mod.value}`)

const { data: dependencies, pending: isDepFetching, execute: fechDep } = await useLazyAPI<{ versions: any, projects: IModInfo[] }>(() => `project/${mod.value}/dependencies`)

const onlyRequiredDep = computed(() => {
  return dependencies.value?.projects.filter(({ categories }) => categories.length === 1 && categories[0] === 'library')
})

const isForge = computed(() => data.value?.loaders.includes('forge'))
const isFabric = computed(() => data.value?.loaders.includes('fabric'))
const latestVersion = computed(() => data.value?.game_versions.at(-1))

function addMods() {
  addMod()
}

onMounted(() => {
  if (mod.value) {
    fetchMod()
    fechDep()
  }
})

function clear() {
  setQuery('mod', null)
}
</script>

<template>
  <USlideover v-model="isModExist" as="div" :ui="{ base: 'px-5' }" @close="clear">
    <div v-if="!pending && !isDepFetching" class="h-90% overflow-auto px-2 hide-scrollbar">
      <div class="center">
        <img :src="data?.icon_url" class="rounded-xl size-40 m-5">
      </div>

      <div class="text-center font-bold text-3xl mt-4">
        {{ data?.title }}
      </div>

      <div class="flex flex-col justify-end items-end">
        <UDownloads class="center mt-5 justify-end float-right" :downloads="data?.downloads" />

        <div class="">
          latest version {{ latestVersion }}
        </div>

        <div>
          <UPopover mode="hover" :popper="{ placement: 'bottom-end' }">
            <UButton variant="outline" class="w-40 center mt-2">
              loaders
            </UButton>

            <template #panel>
              <div v-for="loader in data?.loaders" :key="loader" class="w-40 m-2 capitalize center">
                {{ loader }}
              </div>
            </template>
          </UPopover>
        </div>
      </div>

      <UCard class="mt-5 text-sm">
        {{ data?.description }}
      </UCard>

      <!-- <div class="grid mt-5 grid-cols-2 gap-4">
        <div class="text-center font-bold p-2 bg-red-500 text-white rounded-xl shadow-md" :class="{ '!bg-green-500': isForge }">
          Forge
        </div>

        <div class="bg-red-500 p-2 text-center text-white font-bold rounded-xl shadow-md" :class="{ '!bg-green-500': isFabric }">
          Fabric
        </div>
      </div> -->

      <UAccordion v-if="onlyRequiredDep?.length" size="xl" class="mt-5" :items="[{ label: `Dependencies ${onlyRequiredDep.length || ''}`, slot: 'dep' }]">
        <template #dep>
          <div v-for="dep in onlyRequiredDep" :key="dep.slug" class="flex gap-4 items-center text-white my-2">
            <img :src="dep.icon_url" class="size-10 rounded-xl" alt="">
            <UButton variant="link" @click="setQuery('mod', dep.slug)">
              {{ dep.slug }}
            </UButton>
          </div>
        </template>
      </UAccordion>

      <div class="absolute bottom-0 left-0 w-full p-2">
        <UButton class="w-full center p-4 font-semibold" variant="solid">
          Add to Modpack
        </UButton>
      </div>
    </div>

    <template v-else>
      <ModInfoSkeleton />
    </template>
  </USlideover>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
