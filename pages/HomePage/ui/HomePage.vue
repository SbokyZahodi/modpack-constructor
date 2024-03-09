<script lang='ts' setup>
import { SelectCategory } from '~/features/SelectCategory'
import { SelectLoader } from '~/features/SelectLoader'
import { ModList } from '~/widgets/ModList'

const modName = ref('')

const loader = computed(() => {
  return useRoute().query.loader?.toString().toLocaleLowerCase()
})

const categories = computed(() => {
  return useRoute().query.categories?.toString().toLocaleLowerCase()
})

const facets = computed(() => {
  const list = []

  list.push(['project_type:mod'])

  if (categories.value)
    categories.value.split(',').forEach(category => list.push([`categories:${category}`]))

  if (loader.value)
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
  setQuery('page', String(page.value))
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
  },
})
</script>

<template>
  <UContainer>
    <UInput v-model="modName" class="mt-10" size="xl" placeholder="Search mod" trailing-icon="line-md:search" />

    <SelectCategory class="my-4" />
    <div class="md:flex items-center justify-between">
      <SelectLoader />
      <UPagination v-model="page" :total="data?.total_hits" :page-count="20" />
    </div>

    <div class="my-4">
      <ModList :mods="data?.hits" :pending="pending" />
    </div>
  </UContainer>
</template>
