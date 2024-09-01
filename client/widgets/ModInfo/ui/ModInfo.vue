<script lang='ts' setup>
import { InstallMod } from '~/features/_modpack/InstallMod'
import type { IModInfo } from '~/shared/api/types/IModInfo'

const CheckOriginButton = defineAsyncComponent(() => import('./CheckOriginButton.vue'))

const modInfo = useState<IModInfo | null>('mod', () => null)
const isModalOpened = ref(false)

watch(modInfo, () => {
  if (modInfo.value)
    isModalOpened.value = true

  if (!modInfo.value)
    isModalOpened.value = false
})

function closeModal() {
  isModalOpened.value = false

  setTimeout(() => {
    modInfo.value = null
  }, 300)
}
</script>

<template>
  <LazyUModal v-model="isModalOpened" :ui="{ base: 'px-5' }" @close="closeModal">
    <div class="overflow-auto h-200 hide-scrollbar px-2">
      <LazyUCloseButton class="absolute mt4 left-4" @click="closeModal" />
      <CheckOriginButton v-if="modInfo" :provider="modInfo.provider" :mod-slug="modInfo.slug" />

      <div class="center">
        <NuxtImg v-if="modInfo" format="webp" :src="modInfo?.logo" class="rounded-xl size-40 m-5" />
      </div>

      <div class="mt-4 text-center text-3xl font-bold">
        {{ modInfo?.title }}
      </div>

      <div class="flex justify-end flex-col items-end">
        <UDownloads v-if="modInfo?.downloads" class="center justify-end mt-5 float-right" :downloads="modInfo.downloads" />
      </div>

      <UCard class="mt-5 text-sm">
        {{ modInfo?.description }}
      </UCard>

      <ClientOnly>
        <UCarousel
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
          <NuxtImg :src="item" placeholder loading="lazy" class="h-70 w-120 object-contain" draggable="false" />
        </UCarousel>
      </ClientOnly>

      <div class="absolute w-full p-2 left-0 bottom-0">
        <InstallMod v-if="modInfo" :mod="modInfo" @installed="() => closeModal()" />
      </div>
    </div>
  </LazyUModal>
</template>
