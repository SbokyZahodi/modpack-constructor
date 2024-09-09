<script lang='ts' setup>
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import ModList from './ModList.vue'
import ModpackActions from './ModpackActions.vue'
import ModpackInfo from './ModpackInfo.vue'
import { SelectModVersion } from '~/features/_modpack/SelectModVersion'

const ModpackConfigurator = defineAsyncComponent(() => import('./ModpackConfigurator.vue'))

const { modpack } = useModpack()

const isModConfiguratorOpened = ref(false)
</script>

<template>
  <div>
    <UCard class="mt">
      <div class="flex justify-between items-center">
        <ModpackInfo v-model:isOptionsModalOpened="isModConfiguratorOpened" :modpack="modpack" />

        <ModpackActions v-if="modpack.modlist.length" :modpack="modpack" class="flex gap-2" />
      </div>
    </UCard>

    <ModList class="mt" />
    <ModpackConfigurator v-model="isModConfiguratorOpened" @close-modal="isModConfiguratorOpened = false" />
    <SelectModVersion />
  </div>
</template>
