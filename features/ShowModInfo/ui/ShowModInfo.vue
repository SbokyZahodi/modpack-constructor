<script lang='ts' setup>
import ModInfoSkeleton from './ModInfoSkeleton.vue'
import type { IModInfo } from '~/shared/types/IModInfo'

const mod = computed(() => useRoute().query.mod?.toString() || null)

const isModExist = computed(() => Boolean(mod.value))

const baseURL = useRuntimeConfig().public.api

const { data, pending, execute: fetchMod } = await useLazyAPI<IModInfo>(() => `${baseURL}/project/${mod.value}`)

const { data: dependencies, pending: isDepFetching, execute: fechDep } = await useLazyAPI<{ versions: any, projects: IModInfo[] }>(() => `${baseURL}/project/${mod.value}/dependencies`)

const isForge = computed(() => data.value?.loaders.includes('forge'))
const isFabric = computed(() => data.value?.loaders.includes('fabric'))
const latestVersion = computed(() => data.value?.game_versions.at(-1))

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
  <USlideover v-model="isModExist" appear as="div" :ui="{ base: 'px-5' }" @close="clear">
    <div v-if="!pending && !isDepFetching" class="h-90% overflow-auto px-2 hide-scrollbar">
      <div class="center">
        <img :src="data?.icon_url" class="size-40 m-5 rounded-xl">
      </div>

      <div class="text-center font-bold text-3xl mt-4">
        {{ data?.title }}
      </div>
      <UDownloads class="center mt-5 justify-end float-right" :downloads="data?.downloads" />

      <div class="center justify-end">
        latest version {{ latestVersion }}
      </div>

      <UCard class="mt-5 text-sm">
        {{ data?.description }}
      </UCard>

      <div class="grid mt-5 grid-cols-2 gap-4">
        <div class="text-center font-bold p-2 bg-red-500 text-white rounded-xl shadow-md" :class="{ '!bg-green-500': isForge }">
          Forge
        </div>

        <div class="bg-red-500 p-2 text-center text-white font-bold rounded-xl shadow-md" :class="{ '!bg-green-500': isFabric }">
          Fabric
        </div>
      </div>

      <UAccordion v-if="dependencies?.projects?.length" size="xl" class="mt-5" :items="[{ label: `Dependencies ${dependencies?.projects?.length || ''}`, slot: 'dep' }]">
        <template #dep>
          <div v-for="dep in dependencies?.projects" :key="dep.slug" class="flex gap-4 items-center text-white my-2">
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
  display: none; /* для Webkit браузеров */
}

.hide-scrollbar {
  -ms-overflow-style: none;  /* для IE и Edge */
  scrollbar-width: none;  /* для Firefox */
}
</style>
