<script lang='ts' setup>
import { DownloadModpack } from '~/features/DownloadModpack'

const { data: modpack } = await useAsyncData<IModPack>(() => $fetch('/api/modpack', {
  params: {
    id: HGetQuery('modpack'),
  },
}))

if (!modpack.value)
  showError('Modpack not found')

useHead({
  title: `${modpack.value?.loader} - ${modpack.value?.version}`,
})

const { data: mods } = await useAsyncData(() => $api<IMod[]>(`projects?ids=${JSON.stringify(modpack.value?.modlist.map(mod => mod.slug))}`))
</script>

<template>
  <UContainer class="py-5 md:py-20">
    <div class="">
      <h1 class="font-semibold text-2xl md:text-5xl">
        {{ modpack?.loader }} - {{ modpack?.version }}
      </h1>

      <div class="mt-5 md:text-xl">
        Installed mods: {{ modpack?.modlist.length }}
      </div>
    </div>

    <div class="mt-10">
      <UCard v-for="mod in mods" :key="mod.slug" class="my-5" data-aos="fade-right">
        <div class="flex items-center gap-4 text-xl">
          <NuxtImg class="rounded-xl w-15" :src="mod.icon_url" />

          <p class="truncate">
            {{ mod.slug }}
          </p>
        </div>
      </UCard>
    </div>

    <DownloadModpack v-if="modpack" class="w-full center mt-10 h-20" size="xl" variant="outline" :modpack="modpack" />
  </UContainer>
</template>
