<script lang='ts' setup>
import { useFilters } from '../model'
import { SelectCategory } from '~/features/SelectCategory'
import { SelectLoader } from '~/features/SelectLoader'
import { SelectProjectType } from '~/features/SelectProjectType'
import { ModList } from '~/widgets/ModList'

const modName = ref('')

const { modlistPage, searchOptions } = useFilters()

const searchPage = ref(modlistPage.value)
const offset = computed(() => (modlistPage.value - 1) * 20)

watch(() => searchPage.value, () => {
  HSetQuery('page', String(searchPage.value))
})

watch(() => searchOptions.value, () => {
  searchPage.value = 1
})

const { data, pending } = await useAPI<{ limit: number, offset: number, total_hits: number, hits: IMod[] }>('search', {
  query: {
    query: modName,
    limit: 20,
    facets: searchOptions,
    offset,
    project_type: HGetQuery('project_type', 'mod'),
  },
})
</script>

<template>
  <UContainer>
    <div class="md:flex justify-between items-center gap-4">
      <UInput v-model="modName" class="basis-1/2" size="lg" placeholder="Search mod" trailing-icon="line-md:search" />
      <SelectProjectType class="relative bottom-1 basis-1/2" />
    </div>

    <SelectCategory class="my-1" />
    <div class="items-center justify-between md:flex my-4">
      <SelectLoader />
      <UPagination v-if="data" v-model="searchPage" :total="data.total_hits" class="relative bottom-1 mt-5 md:mt-0" :page-count="20" />
    </div>

    <div class="my-4">
      <ModList :mods="data?.hits ?? []" :pending="pending" />
    </div>
  </UContainer>
</template>
