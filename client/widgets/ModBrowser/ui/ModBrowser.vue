<script lang='ts' setup>
import { useModsFilters } from '../model'
import { searchMods } from '~/modcurse'

import { SelectProvider } from '~/features/_browser/SelectProvider'
import { SelectProjectType } from '~/features/_browser/SelectProjectType'
import { ModList } from '~/widgets/ModList'

const { modpack } = useModpack()
const pending = ref(true)

const { offset, searchPage, modName, project_type, provider } = useModsFilters()

const { data, execute } = await useLazyAsyncData('search-mods', async () => {
  const searchParams = { offset: offset.value, modloader: modpack.value.loader, version: modpack.value.version, project_type: project_type.value }

  pending.value = true

  try {
    if (provider.value === 'modrinth') {
      return await searchMods(modName.value).Modrinth(searchParams)
    }

    return await searchMods(modName.value).CurseForge(searchParams)
  }
  catch {
    console.error('Failed to search mods')
  }
  finally {
    pending.value = false

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}, { server: false, watch: [searchPage] })

watch(() => [modName.value, provider.value, project_type.value, modpack.value.version, modpack.value.loader], () => {
  searchPage.value = 1
  execute()
})
</script>

<template>
  <div>
    <div class="sticky top-0 backdrop-blur rounded-b-2xl z-50">
      <div class="flex justify-between gap-4">
        <UInput v-model="modName" class="w-full center" size="lg" placeholder="Search mod" trailing-icon="line-md:search" />
        <SelectProvider class="pt-2" />
      </div>

      <div class="justify-between gap-4 items-center lg:flex">
        <SelectProjectType class="pt-2" />

        <UPagination v-model="searchPage" :total="data?.pagination?.total / 20" />
      </div>
    </div>

    <ModList class="mt" :mods="data?.data ?? []" :pending="pending" />
  </div>
</template>
