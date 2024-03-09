<script lang='ts' setup>
import { useModpack } from '..'

const { modpack } = useModpack()

const { data: versions } = await useAPI('tag/game_version')

const majorVersionsOptions = computed(() => {
  return versions.value.filter(({ major }) => major).map(item => item.version)
})

console.log(majorVersionsOptions.value)

const loaders = [{ label: 'Forge' }, { label: 'Fabric' }, { label: 'NeoForge' }, { label: 'Quilt' }]
const version = ref(majorVersionsOptions.value[0])
</script>

<template>
  <UModal>
    <div class="h-120 p-4 flex flex-col gap-3 relativ3">
      <div class="text-lg font-semibold">
        Select modpack configuration
      </div>

      <UTabs :items="loaders" />

      <!-- <USelectMenu v-model="modpack.loader" :options="loaders" size="lg" /> -->

      <USelectMenu v-model="version" open size="lg" :options="majorVersionsOptions" />

      <div class="absolute bottom-2 flex justify-around right-0 gap-3 w-full">
        <UButton size="xl" variant="outline" class="w-50 center" color="red">
          Cancel
        </UButton>
        <UButton size="xl" variant="outline" class="w-50 center" @click="useToast().add({ title: 'Saved!' })">
          Save
        </UButton>
      </div>
    </div>
  </UModal>
</template>
