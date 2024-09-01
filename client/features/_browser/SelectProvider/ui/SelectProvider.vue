<script lang='ts' setup>
const providers = [{ label: 'Modrinth', raw: 'modrinth', icon: 'simple-icons:modrinth' }, { label: 'CurseForge', raw: 'curseforge', icon: 'simple-icons:curseforge' }]
const currentProvider = ref(HGetQuery('provider', 'modrinth'))

onMounted(() => {
  if (!HGetQuery('provider'))
    HSetQuery('provider', 'modrinth')
})

function setProvider(provider: number) {
  currentProvider.value = providers[provider]?.raw
  HSetQuery('provider', currentProvider.value)
}
</script>

<template>
  <UTabs class="basis-1/3" :items="providers" :default-index="providers.findIndex((el) => el.raw === currentProvider)" @change="setProvider($event)" />
</template>
