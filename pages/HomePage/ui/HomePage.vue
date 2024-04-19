<script lang='ts' setup>
import { SelectCategory } from '~/features/SelectCategory'
import { SelectLoader } from '~/features/SelectLoader'
import { SelectProjectType } from '~/features/SelectProjectType'
import { ModList } from '~/widgets/ModList'
import { useModpack } from '~/widgets/ModPack'

const modName = ref('')
defineOgImageComponent('NuxtSeo', {
  theme: '#00ffff',
  colorMode: 'dark',
  title: 'Modpack Constructor',
  siteName: 'MC',
  siteLogo: '/logo.png',
  description: 'The Minecraft Modpack Constructor in Browser',
})

const { modpack } = useModpack()

const loader = computed(() => {
  return useRoute().query.loader?.toString().toLocaleLowerCase()
})

const categories = computed(() => {
  return useRoute().query.categories?.toString().toLocaleLowerCase()
})

const project_type = computed(() => {
  return HGetQuery('project_type', 'mod')
})

const facets = computed(() => {
  const list = []

  list.push([`project_type:${project_type.value}`])
  list.push([`versions:${modpack.value.version}`])

  if (categories.value)
    categories.value.split(',').forEach(category => list.push([`categories:${category}`]))

  if (project_type.value === 'datapack')
    list.push([`project_type:datapack`])

  if (loader.value && project_type.value === 'mod')
    list.push([`categories:${loader.value}`])

  return JSON.stringify(list)
})

const routePage = computed(() => {
  if (useRoute().query.page)
    return Number(useRoute().query.page)

  return 1
})

const page = ref(routePage.value)
const offset = computed(() => (page.value - 1) * 20)

watch(() => page.value, () => {
  HSetQuery('page', String(page.value))
})

watch(() => facets.value, () => {
  page.value = 1
})

const { data, pending } = await useAPI<{ limit: number, offset: number, total_hits: number, hits: IMod[] }>('search', {
  query: {
    query: modName,
    limit: 20,
    facets,
    offset,
    project_type: HGetQuery('project_type', 'mod'),
  },

})
</script>

<template>
  <UContainer>
    <SelectProjectType />
    <UInput v-model="modName" class="" size="xl" placeholder="Search mod" trailing-icon="line-md:search" />

    <SelectCategory class="my-4" />
    <div class="my-4 items-center justify-between md:flex">
      <SelectLoader v-if="HGetQuery('project_type', 'mod') === 'mod'" />
      <UPagination v-if="data" v-model="page" :total="data.total_hits" :page-count="20" />
    </div>

    <div class="my-4">
      <ModList :mods="data?.hits ?? []" :pending="pending" />
    </div>
  </UContainer>
</template>
