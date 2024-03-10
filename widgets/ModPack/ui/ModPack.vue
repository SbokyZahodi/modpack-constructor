<script lang='ts' setup>
import { useModpack } from '..'
import ModPackOptions from './ModPackOptions.vue'

const isSlideOpen = ref(false)
const isOptionsModalOpened = ref(false)
const { modpack } = useModpack()
</script>

<template>
  <div class="absolute top-0 left-0 h-full w-20" @mouseenter="isSlideOpen = true">
    <USlideover v-model="isSlideOpen" side="left" @click="isSlideOpen = !isSlideOpen">
      <div class="h-full w-full" @mouseleave="isSlideOpen = false">
        <div class="p2">
          <UButton icon="gravity-ui:gear" size="xl" class="w-full center" @click="isOptionsModalOpened = true">
            {{ modpack.loader }} - {{ modpack.version }}
          </UButton>
        </div>
      </div>
    </USlideover>
    <ModPackOptions v-model="isOptionsModalOpened" @close="isOptionsModalOpened = false" />
  </div>
</template>
