<script lang='ts' setup>
import { InstallMod } from '~/features/_modpack/InstallMod'
import type { IModInfo } from '~/shared/api/types/IModInfo'

const CheckOriginButton = defineAsyncComponent(() => import('./CheckOriginButton.vue'))

const modInfo = useState<IModInfo | null>('mod', () => null)

const isModExist = computed({
  get() {
    return modInfo.value !== null
  },
  set() {
    modInfo.value = null
  },
})
</script>

<template>
  <LazyUSlideover v-model="isModExist" :ui="{ base: 'px-5' }" @close="modInfo = null">
    <div class="overflow-auto hide-scrollbar h-90% px-2">
      <LazyUCloseButton class="absolute mt4 left-4" @click="modInfo = null" />
      <CheckOriginButton v-if="modInfo" :provider="modInfo.provider" :mod-slug="modInfo.slug" />

      <div class="center">
        <NuxtImg v-if="modInfo" format="webp" :src="modInfo?.logo" class="size-40 rounded-xl m-5" />
      </div>

      <div class="text-center mt-4 text-3xl font-bold">
        {{ modInfo?.title }}
      </div>

      <div class="flex flex-col justify-end items-end">
        <UDownloads v-if="modInfo?.downloads" class="center justify-end mt-5 float-right" :downloads="modInfo.downloads" />
      </div>

      <UCard class="mt-5 text-sm">
        {{ modInfo?.description }}
      </UCard>

      <LazyUCarousel
        v-if="modInfo?.gallery.length"
        v-slot="{ item }" :items="modInfo?.gallery.slice(0, 10)"

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

        :ui="{ item: 'snap-end' }" arrows indicators class="mt-4 rounded-xl overflow-hidden h-70"
      >
        <NuxtImg :src="item" placeholder class="h-70 w-100" draggable="false" />
      </LazyUCarousel>

      <div class="absolute w-full p-2 left-0 bottom-0">
        <InstallMod v-if="modInfo" :mod="modInfo" @added="modInfo = null" />
      </div>
    </div>
  </LazyUSlideover>
</template>
