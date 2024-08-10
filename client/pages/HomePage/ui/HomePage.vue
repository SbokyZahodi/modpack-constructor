<script lang='ts' setup>
import { ModPack } from '~/widgets/ModPack'
import { ModBrowser } from '~/widgets/ModBrowser'

const ModInfo = defineAsyncComponent(() => import('~/widgets/ModInfo/ui/ModInfo.vue'))
const MobileNavigationBar = defineAsyncComponent(() => import('./MobileNavigationBar.vue'))
</script>

<template>
  <MobileNavigationBar v-if="useDevice().isMobile" class="m-3" />

  <div v-if="!useDevice().isMobile" class="grid-cols-2 md:grid-cols-3 gap-10 m-5 lg:grid md:grid">
    <ModPack class="h95vh sticky top-5" />
    <ModBrowser class="hidden lg:block col-span-2" />
  </div>

  <ModInfo />
</template>
