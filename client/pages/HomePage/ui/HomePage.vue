<script lang='ts' setup>
import { ModPack } from '~/widgets/ModPack'
import { ModBrowser } from '~/widgets/ModBrowser'

const ModInfo = defineAsyncComponent(() => import('~/widgets/ModInfo/ui/ModInfo.vue'))

const tabs = [
  { label: 'ModPack', component: ModPack, icon: 'fluent:backpack-28-filled' },
  { label: 'Browser', component: ModBrowser, icon: 'ic:sharp-search' },
]

const currentTab = ref(HGetQuery('tab', 0))

watch(() => {
  currentTab.value = HGetQuery('tab', 1)
}, HGetQuery('tab'))
</script>

<template>
  <UContainer class="py-4">
    <div class="flex justify-center">
      <UTabs v-model="currentTab" class="w-fit" :items="tabs" @change="(res) => HSetQuery('tab', res)" />
    </div>

    <TransitionSlide mode="out-in">
      <component :is="tabs[currentTab]?.component" />
    </TransitionSlide>

    <ModInfo />
  </UContainer>
</template>
