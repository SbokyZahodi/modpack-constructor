<script lang='ts' setup>
import { DownloadModpack } from '~/features/_modpack/DownloadModpack'

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

    <div class="mt-10 pb-15">
      <UCard v-for="mod in modpack?.modlist" :key="mod.slug" class="my-5" data-aos="fade-right">
        <div class="flex items-center text-xl gap-4">
          <NuxtImg class="rounded-xl w-15" :src="mod.logo" />

          <p class="truncate">
            {{ mod.slug }}
          </p>
        </div>
      </UCard>
    </div>

    <div class="w-full fixed bottom-2 left-0">
      <UContainer>
        <DownloadModpack v-if="modpack" class="w-full mt-10 h-17 backdrop-blur-xl center" size="xl" variant="outline" :modpack="modpack" />
      </UContainer>
    </div>
  </UContainer>
</template>
