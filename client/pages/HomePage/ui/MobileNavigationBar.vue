<script lang='ts' setup>
import { ModPack } from '~/widgets/ModPack'
import { ModBrowser } from '~/widgets/ModBrowser'

const tabs = [
  { label: 'ModPack', component: ModPack },
  { label: 'Browser', component: ModBrowser },
]

const currentTab = ref(1)
</script>

<template>
  <div>
    <UTabs v-model="currentTab" :items="tabs" />

    <component :is="tabs[currentTab]?.component" />
  </div>
</template>
