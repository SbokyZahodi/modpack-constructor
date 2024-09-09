<script lang='ts' setup>
import { fetchGameVersions } from '~/modcurse'

const emit = defineEmits(['closeModal'])

const { modpack, setLoader, setVersion } = useModpack()

const { data: versions } = await useAsyncData('minecraft-versions', () => fetchGameVersions())

const majorVersionsOptions = computed<string[]>(() => {
  return versions.value?.filter(({ major }) => major).map(item => item.version) ?? []
})

const loaders = [{ label: 'forge' }, { label: 'fabric' }, { label: 'neoforge' }, { label: 'quilt' }]

const loader = ref<ILoader>(modpack.value.loader)
const version = ref(modpack.value.version)

onMounted(() => {
  loader.value = modpack.value.loader
  version.value = modpack.value.version
})

function saveChanges() {
  if (loader.value === modpack.value.loader && version.value === modpack.value.version) {
    emit('closeModal')
    return
  }

  setLoader(loader.value)
  setVersion(version.value)
  useToast().add({ title: 'Modpack settings updated!', icon: 'ic:round-save' })
  emit('closeModal')
}
</script>

<template>
  <UModal prevent-close>
    <div class="flex h-140 p-4 flex-col gap-3">
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

      <div class="grid gap-2 w-full absolute px-2 grid-cols-2 bottom-2 justify-around right-0">
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
