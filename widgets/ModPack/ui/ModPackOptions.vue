<script lang='ts' setup>
import { useModpack } from '..'

const emit = defineEmits(['close'])

const { modpack, setLoader, setVersion } = useModpack()

interface GameVersion {
  version: string
  version_type: string
  date: string
  major: boolean
}

const { data: versions } = await useAPI<GameVersion[]>('tag/game_version')

const majorVersionsOptions = computed<string[]>(() => {
  return versions.value?.filter(({ major }) => major).map(item => item.version) ?? []
})

const loaders = [{ label: 'Forge' }, { label: 'Fabric' }, { label: 'NeoForge' }, { label: 'Quilt' }]

const loader = ref('')
const version = ref('1.20.1')

onMounted(() => {
  loader.value = modpack.value.loader
  version.value = modpack.value.version
})

function saveChanges() {
  setLoader(loader.value)
  setVersion(version.value)
  useToast().add({ title: 'Modpack settings updated!', icon: 'ic:round-save' })
  emit('close')
}
</script>

<template>
  <UModal prevent-close>
    <div class="p-4 flex flex-col h-120 gap-3">
      <div class="font-semibold text-lg">
        Select modpack configuration
      </div>

      <UTabs :items="loaders" :default-index="loaders.findIndex((el) => el.label === modpack.loader)" @change="loader = loaders[$event].label" />

      <USelectMenu v-model="version" size="lg" :options="majorVersionsOptions" />

      <UAlert v-if="modpack.modlist.length" title="If you change a version the modpack will be reset" icon="octicon:alert-16" description="" color="red" variant="outline" />

      <div class="flex absolute w-full justify-around bottom-2 right-0">
        <UButton size="xl" variant="outline" class="center w-60" color="red" @click="emit('close')">
          Cancel
        </UButton>
        <UButton size="xl" variant="outline" class="w-60 center" @click="saveChanges">
          Save
        </UButton>
      </div>
    </div>
  </UModal>
</template>
