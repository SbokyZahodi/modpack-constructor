<script lang='ts' setup>
import { useModpack } from '..'

const emit = defineEmits(['closeModal'])

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

const loader = ref<ILoader>(modpack.value.loader)
const version = ref('1.20.1')

onMounted(() => {
  loader.value = modpack.value.loader
  version.value = modpack.value.version
})

watch(() => [loader.value, version.value], () => {
  sessionStorage.setItem('modpack', JSON.stringify(modpack.value))
})

function saveChanges() {
  setLoader(loader.value)
  setVersion(version.value)
  useToast().add({ title: 'Modpack settings updated!', icon: 'ic:round-save' })
  emit('closeModal')
}
</script>

<template>
  <UModal prevent-close>
    <div class="flex p-4 flex-col h-140 gap-3">
      <div class="font-semibold text-lg text-center mb-2">
        Select modpack configuration
      </div>

      <div>
        <p class="mb-2">
          Modloader
        </p>
        <UTabs :items="loaders" :default-index="loaders.findIndex((el) => el.label === modpack.loader)" @change="loader = (loaders[$event].label as ILoader)" />
      </div>

      <div>
        <p class="mb-2">
          Game version
        </p>
        <USelectMenu v-model="version" size="lg" :options="majorVersionsOptions" />
      </div>

      <UAlert v-if="modpack.modlist.length" class="mt-2" title="If you change a modpack configuration modlist will be reset" icon="octicon:alert-16" description="" color="red" variant="outline" />

      <div class="absolute grid gap-2 px-2 w-full bottom-2 grid-cols-2 justify-around right-0">
        <UButton size="xl" variant="outline" class="center" color="red" @click="emit('closeModal')">
          Cancel
        </UButton>
        <UButton size="xl" variant="outline" class="center" @click="saveChanges">
          Save
        </UButton>
      </div>
    </div>
  </UModal>
</template>
